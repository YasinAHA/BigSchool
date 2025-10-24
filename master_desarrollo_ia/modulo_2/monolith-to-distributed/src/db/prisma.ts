// Lazy-initialize Prisma client to avoid creating it at module load time.
// This helps tools like `prisma generate` which may run before the client is
// generated and prevents throwing during module import.
export type PrismaClientType = any;

let _prisma: PrismaClientType | undefined;

export function getPrisma(): PrismaClientType | undefined {
  if (_prisma) return _prisma;

  try {
    // Use require so this file can be imported without requiring a generated client
    // to exist at import-time.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { PrismaClient } = require('@prisma/client');

    const globalForPrisma = globalThis as unknown as { prisma?: PrismaClientType };
    _prisma = globalForPrisma.prisma ?? new PrismaClient();

    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = _prisma;

    return _prisma;
  } catch (err) {
    // Prisma client may not be generated yet. Return undefined and let callers
    // handle the absence gracefully.
    // Do not throw here to avoid breaking CLI tools that import project files.
    // eslint-disable-next-line no-console
    console.warn('@prisma/client not available yet. Run `npx prisma generate`.');
    return undefined;
  }
}