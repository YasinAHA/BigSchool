// src/domain/errors/DomainError.ts
export class DomainError extends Error {}
export class InvalidStat extends DomainError {}
// (los errores concretos se irán definiendo en sus respectivos módulos: InvvalidSKU, InvalidPrice, etc.)

export class InvalidPrice extends DomainError {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidPrice';
    }
}