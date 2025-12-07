import { type Page, type Locator } from '@playwright/test'

export class ShoppingCartPage {
  readonly page: Page
  readonly heading: Locator
  readonly emptyMessage: Locator
  readonly checkoutButton: Locator
  readonly subtotal: Locator
  readonly total: Locator
  readonly cartItems: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole('heading', { name: 'Shopping Cart' })
    // Use the visible paragraph, not the sr-only aria-live region
    this.emptyMessage = page.locator('p.text-gray-500').filter({ hasText: 'Your cart is empty' })
    this.checkoutButton = page.getByRole('button', { name: /checkout/i })
    this.subtotal = page.getByTestId('cart-subtotal')
    this.total = page.getByTestId('cart-total')
    this.cartItems = page.locator('[data-testid^="cart-item-"]')
  }

  getCartItem(productName: string): Locator {
    return this.page.locator('[data-testid^="cart-item-"]').filter({
      has: this.page.getByRole('heading', { name: productName }),
    })
  }

  async getItemQuantity(productName: string): Promise<number> {
    const item = this.getCartItem(productName)
    const quantityText = await item.getByTestId('item-quantity').textContent()
    return parseInt(quantityText ?? '0', 10)
  }

  async increaseQuantity(productName: string) {
    const item = this.getCartItem(productName)
    await item.getByRole('button', { name: `Increase quantity of ${productName}` }).click()
  }

  async decreaseQuantity(productName: string) {
    const item = this.getCartItem(productName)
    await item.getByRole('button', { name: `Decrease quantity of ${productName}` }).click()
  }

  async removeItem(productName: string) {
    const item = this.getCartItem(productName)
    await item.getByRole('button', { name: `Remove ${productName} from cart` }).click()
  }

  async getSubtotalValue(): Promise<string> {
    return (await this.subtotal.textContent()) ?? ''
  }

  async getTotalValue(): Promise<string> {
    return (await this.total.textContent()) ?? ''
  }

  async getItemCount(): Promise<number> {
    return await this.cartItems.count()
  }
}
