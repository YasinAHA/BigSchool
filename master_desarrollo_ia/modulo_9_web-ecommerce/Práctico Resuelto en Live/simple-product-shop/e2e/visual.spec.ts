import { test, expect } from '@playwright/test'
import { ProductCatalogPage } from './pages/ProductCatalogPage'
import { ShoppingCartPage } from './pages/ShoppingCartPage'

test.describe('Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('homepage with product catalog', async ({ page }) => {
    const catalogPage = new ProductCatalogPage(page)

    await expect(catalogPage.heading).toBeVisible()
    await expect(catalogPage.productCards).toHaveCount(6)

    await expect(page).toHaveScreenshot('homepage-catalog.png', {
      maxDiffPixelRatio: 0.05,
    })
  })

  test('cart with items', async ({ page }) => {
    const catalogPage = new ProductCatalogPage(page)
    const cartPage = new ShoppingCartPage(page)

    await catalogPage.addToCart('Wireless Headphones')
    await catalogPage.addToCart('Smart Watch')

    await expect(cartPage.cartItems).toHaveCount(2)

    await expect(page).toHaveScreenshot('cart-with-items.png', {
      maxDiffPixelRatio: 0.05,
    })
  })
})
