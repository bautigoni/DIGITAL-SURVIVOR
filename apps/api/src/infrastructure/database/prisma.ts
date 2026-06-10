import { PrismaClient } from '@prisma/client';

let _client: PrismaClient | null = null;

export const getPrisma = (): PrismaClient => {
  if (!_client) {
    _client = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error'],
    });
  }
  return _client;
};
