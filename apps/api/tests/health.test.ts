import { describe, it, expect } from 'vitest';
import { createApp } from '../src/config/app.js';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';

/**
 * Helper: arranca la app en un puerto random y devuelve una función fetch tipada.
 * Reemplaza a supertest con cero dependencias externas.
 */
const startApp = async (): Promise<{ url: string; close: () => Promise<void> }> => {
  const app = createApp();
  return new Promise((resolve) => {
    const server: Server = app.listen(0, () => {
      const addr = server.address() as AddressInfo;
      resolve({
        url: `http://127.0.0.1:${addr.port}`,
        close: () =>
          new Promise<void>((res) => {
            server.close(() => res());
          }),
      });
    });
  });
};

describe('Health', () => {
  it('GET /api/health returns ok', async () => {
    const { url, close } = await startApp();
    try {
      const res = await fetch(`${url}/api/health`);
      expect(res.status).toBe(200);
      const body = (await res.json()) as { status: string };
      expect(body.status).toBe('ok');
    } finally {
      await close();
    }
  });
});
