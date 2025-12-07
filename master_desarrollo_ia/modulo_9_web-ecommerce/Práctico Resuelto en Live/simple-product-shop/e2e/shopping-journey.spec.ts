import { test, expect } from '@playwright/test'
import { ProductCatalogPage } from './pages/ProductCatalogPage'
import { ShoppingCartPage } from './pages/ShoppingCartPage'

const PRODUCT_HEADPHONES = 'Wireless Headphones'
const PRODUCT_WATCH = 'Smart Watch'

test.describe('Shopping Journey', () => {
  let catalogPage: ProductCatalogPage
  let cartPage: ShoppingCartPage

  test.beforeEach(async ({ page }) => {
    catalogPage = new ProductCatalogPage(page)
    cartPage = new ShoppingCartPage(page)

    await catalogPage.goto()
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('cart is empty initially', async () => {
    await expect(cartPage.emptyMessage).toBeVisible()
    await expect(cartPage.cartItems).toHaveCount(0)
  })

  test('adding a product shows it in the cart', async () => {
    await catalogPage.addToCart(PRODUCT_HEADPHONES)

    await expect(cartPage.emptyMessage).not.toBeVisible()
    await expect(cartPage.getCartItem(PRODUCT_HEADPHONES)).toBeVisible()
    await expect(cartPage.cartItems).toHaveCount(1)
  })

  test('adding the same product increments quantity', async () => {
    await catalogPage.addToCart(PRODUCT_HEADPHONES)
    await catalogPage.addToCart(PRODUCT_HEADPHONES)

    await expect(cartPage.cartItems).toHaveCount(1)
    expect(await cartPage.getItemQuantity(PRODUCT_HEADPHONES)).toBe(2)
  })

  test('increase button increments quantity', async () => {
    await catalogPage.addToCart(PRODUCT_HEADPHONES)
    expect(await cartPage.getItemQuantity(PRODUCT_HEADPHONES)).toBe(1)

    await cartPage.increaseQuantity(PRODUCT_HEADPHONES)
    expect(await cartPage.getItemQuantity(PRODUCT_HEADPHONES)).toBe(2)

    await cartPage.increaseQuantity(PRODUCT_HEADPHONES)
    expect(await cartPage.getItemQuantity(PRODUCT_HEADPHONES)).toBe(3)
  })

  test('decrease button decrements quantity', async () => {
    await catalogPage.addToCart(PRODUCT_HEADPHONES)
    await cartPage.increaseQuantity(PRODUCT_HEADPHONES)
    await cartPage.increaseQuantity(PRODUCT_HEADPHONES)
    expect(await cartPage.getItemQuantity(PRODUCT_HEADPHONES)).toBe(3)

    await cartPage.decreaseQuantity(PRODUCT_HEADPHONES)
    expect(await cartPage.getItemQuantity(PRODUCT_HEADPHONES)).toBe(2)
  })

  test('remove button removes item from cart', async () => {
    await catalogPage.addToCart(PRODUCT_HEADPHONES)
    await catalogPage.addToCart(PRODUCT_WATCH)
    await expect(cartPage.cartItems).toHaveCount(2)

    await cartPage.removeItem(PRODUCT_HEADPHONES)

    await expect(cartPage.cartItems).toHaveCount(1)
    await expect(cartPage.getCartItem(PRODUCT_HEADPHONES)).not.toBeVisible()
    await expect(cartPage.getCartItem(PRODUCT_WATCH)).toBeVisible()
  })

  test('bulk discount appears when 5+ items of same product', async ({ page }) => {
    await catalogPage.addToCart(PRODUCT_HEADPHONES)

    // Increase to 5 items
    for (let i = 0; i < 4; i++) {
      await cartPage.increaseQuantity(PRODUCT_HEADPHONES)
    }

    expect(await cartPage.getItemQuantity(PRODUCT_HEADPHONES)).toBe(5)
    await expect(page.getByText('Bulk Discount')).toBeVisible()
  })

  test('cart persists after page refresh', async ({ page }) => {
    await catalogPage.addToCart(PRODUCT_HEADPHONES)
    await cartPage.increaseQuantity(PRODUCT_HEADPHONES)
    expect(await cartPage.getItemQuantity(PRODUCT_HEADPHONES)).toBe(2)

    await page.reload()

    await expect(cartPage.getCartItem(PRODUCT_HEADPHONES)).toBeVisible()
    expect(await cartPage.getItemQuantity(PRODUCT_HEADPHONES)).toBe(2)
  })
})
