import { z } from 'zod';

export const config = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    DATABASE_URL: z.string().url().optional(),
    PRICING_BASE_URL: z.string().url().default('http://localhost:4000'),
    USE_IN_MEMORY_DB: z.coerce.boolean().default(true),
    PORT: z.coerce.number().default(3000),
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

export type Config = z.infer<typeof config>;

export function loadConfig(): Config {
    const parsed = config.safeParse(process.env);
    if (!parsed.success) throw new Error(`Invalid configuration: ${parsed.error.message}`);
    return parsed.data;
}