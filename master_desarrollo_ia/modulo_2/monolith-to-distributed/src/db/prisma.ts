// Lazy-initialize Prisma client to avoid creating it at module load time.
// This helps tools like `prisma generate` which may run before the client is
// generated and prevents throwing during module import.
import type { PrismaClient } from '@prisma/client';

export type PrismaClientType = PrismaClient;

let _prisma: PrismaClientType | undefined;

export async function getPrisma(): Promise<PrismaClientType> {
  if (_prisma) return _prisma;

  try {
    // Dynamic import so the module can be imported even when the generated
    // client does not yet exist on disk. This is compatible with ESM projects.
    const mod = await import('@prisma/client');
    const PrismaClientCtor: typeof PrismaClient = mod.PrismaClient;

    const globalForPrisma = globalThis as unknown as { prisma?: PrismaClientType };
    _prisma = globalForPrisma.prisma ?? new PrismaClientCtor();

    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = _prisma;

    return _prisma;
  } catch (err) {
    // If the client isn't generated yet, surface a clear error to callers.
    // We throw here because callers (createOrder/publisher) will await and
    // can handle the error; throwing avoids returning an undefined that would
    // cause runtime issues later.
    // eslint-disable-next-line no-console
    console.error('@prisma/client not available. Run `npx prisma generate`.');
    throw err;
  }
}