// src/application/dto/AddItemToOrderDTO.ts

import { Currency } from "@domain/value-objects/Currency"

export type AddItemToOrderInput = {
    orderId: string;
    sku: string;
    qty: number;
    currency: Currency
}

export type AddItemToOrderOutput = {
    orderId: string;
    total: {
        amount: number; 
        currency: Currency
    }
}