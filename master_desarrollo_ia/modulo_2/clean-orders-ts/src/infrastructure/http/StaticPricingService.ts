import { PricingService } from '../../application/ports/pricing-service';

export class StaticPricingService implements PricingService {
  private prices: Record<string, number> = {
    'SKU-1': 100,
    'SKU-2': 250,
  };

  priceForSku(sku: string): number {
    return this.prices[sku] ?? 0;
  }
}
