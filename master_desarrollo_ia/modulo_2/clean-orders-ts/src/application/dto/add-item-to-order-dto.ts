// src/application/dto/add-item-to-order-dto.ts
export interface AddItemToOrderDto {
    orderSku: string
    productSku: string
    quantity: number
}