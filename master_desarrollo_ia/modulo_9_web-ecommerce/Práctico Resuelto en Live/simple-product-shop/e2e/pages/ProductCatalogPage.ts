import { type Page, type Locator } from '@playwright/test'

export class ProductCatalogPage {
  readonly page: Page
  readonly heading: Locator
  readonly productCards: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole('heading', { name: 'Products' })
    this.productCards = page.locator('[data-testid^="product-card-"]')
  }

  async goto() {
    await this.page.goto('/')
  }

  getProduct(name: string): Locator {
    return this.page.locator('[data-testid^="product-card-"]').filter({
      has: this.page.getByRole('heading', { name }),
    })
  }

  async addToCart(productName: string) {
    const product = this.getProduct(productName)
    const addButton = product.getByRole('button', { name: `Add ${productName} to cart` })
    await addButton.click()
    // Wait for button to return to idle state (after loading + success states)
    await addButton.waitFor({ state: 'visible', timeout: 5000 })
  }

  async getProductPrice(productName: string): Promise<string> {
    const product = this.getProduct(productName)
    const priceText = await product.locator('p').filter({ hasText: /^\$/ }).textContent()
    return priceText ?? ''
  }
}
