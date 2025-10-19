export type CreateOrderDTO = {
  customerId: string;
  items?: { sku: string; quantity: number }[];
};
