// src/application/ports/Logger.ts
export interface Logger {
    info(message: string, meta?: Record<string, unknown>): void
    error(message: string, meta?: Record<string, unknown>): void
}