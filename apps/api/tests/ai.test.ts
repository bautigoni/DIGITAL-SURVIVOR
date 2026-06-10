import { describe, it, expect } from 'vitest';
import jwt from 'jsonwebtoken';
import { createApp } from '../src/config/app.js';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';

process.env.JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-change-me';

const token = jwt.sign({ id: 'u_test', role: 'STUDENT' }, process.env.JWT_SECRET!);

const startApp = async () => {
  const app = createApp();
  return new Promise<{ url: string; close: () => Promise<void> }>((resolve) => {
    const server: Server = app.listen(0, () => {
      const addr = server.address() as AddressInfo;
      resolve({
        url: `http://127.0.0.1:${addr.port}`,
        close: () => new Promise<void>((res) => server.close(() => res())),
      });
    });
  });
};

const post = async (
  url: string,
  path: string,
  body: unknown,
  headers: Record<string, string> = {},
) => {
  const res = await fetch(`${url}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });
  return res;
};

describe('AI endpoint', () => {
  it('works without auth (guest mode)', async () => {
    const { url, close } = await startApp();
    try {
      const res = await post(url, '/api/ai/event', { zone: 'social_media', level: 1 });
      expect(res.status).toBe(200);
    } finally {
      await close();
    }
  });

  it('also works with auth', async () => {
    const { url, close } = await startApp();
    try {
      const res = await post(
        url,
        '/api/ai/event',
        { zone: 'social_media', level: 1 },
        { Authorization: `Bearer ${token}` },
      );
      expect(res.status).toBe(200);
      const body = (await res.json()) as { choices: unknown[] };
      expect(Array.isArray(body.choices)).toBe(true);
    } finally {
      await close();
    }
  });

  it('rejects unknown zone', async () => {
    const { url, close } = await startApp();
    try {
      const res = await post(
        url,
        '/api/ai/event',
        { zone: 'atlantis', level: 1 },
        { Authorization: `Bearer ${token}` },
      );
      expect(res.status).toBe(400);
    } finally {
      await close();
    }
  });
});
