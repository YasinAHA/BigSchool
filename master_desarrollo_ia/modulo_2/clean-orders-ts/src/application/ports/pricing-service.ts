export interface PricingService {
  priceForSku(sku: string): Promise<number> | number;
}
