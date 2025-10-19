// src/infrastructure/observability/PinoLogger.ts
import pino from 'pino'
import { Logger } from "@application/ports/Logger"

const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    prettyPrint: process.env.NODE_ENV !== 'production',
})

export class PinoLogger implements Logger {
    info(message: string, meta?: Record<string, unknown>): void {
        logger.info(meta, message)
    }

    error(message: string, meta?: Record<string, unknown>): void {
        logger.error(meta, message)
    }

    warn(message: string, meta?: Record<string, unknown>): void {
        logger.warn(meta, message)
    }

    debug(message: string, meta?: Record<string, unknown>): void {
        logger.debug(meta, message)
    }
}