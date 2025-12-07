# Video 7: E2E Testing con Playwright (15 min)

## Resultado Final
Tests E2E cubriendo el flujo completo de compra.

---

## Paso 1: Instalar Playwright

```bash
pnpm add -D @playwright/test
pnpm exec playwright install chromium
```

---

## Paso 2: Configurar Playwright

```
Crea la configuración de Playwright.

Ubicación: playwright.config.ts

import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'pnpm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
})

Agrega script en package.json:
"test:e2e": "playwright test"

IMPORTANTE: Actualiza vitest.config.ts para excluir e2e/:
test: {
  // ... otras opciones
  exclude: ['e2e/**', 'node_modules/**'],
}
```

---

## Paso 3: Page Object - ProductCatalogPage

```
Crea Page Object para el catálogo.

Ubicación: e2e/pages/ProductCatalogPage.ts

import { Page, Locator } from '@playwright/test'

export class ProductCatalogPage {
  readonly page: Page
  readonly heading: Locator
  readonly productCards: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole('heading', { name: /products/i })
    this.productCards = page.locator('[data-testid="product-card"]')
  }

  async goto() {
    await this.page.goto('/')
  }

  async addToCart(productName: string) {
    const card = this.page.locator('[data-testid="product-card"]', { hasText: productName })
    await card.getByRole('button', { name: /add to cart/i }).click()
  }

  getProduct(productName: string) {
    return this.page.locator('[data-testid="product-card"]', { hasText: productName })
  }
}

Nota: Agregar data-testid="product-card" a ProductCard si no lo tiene.
```

---

## Paso 4: Page Object - ShoppingCartPage

```
Crea Page Object para el carrito.

Ubicación: e2e/pages/ShoppingCartPage.ts

import { Page, Locator } from '@playwright/test'

export class ShoppingCartPage {
  readonly page: Page
  readonly heading: Locator
  readonly emptyMessage: Locator
  readonly checkoutButton: Locator
  readonly subtotal: Locator
  readonly total: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole('heading', { name: /shopping cart/i })
    this.emptyMessage = page.getByText(/your cart is empty/i)
    this.checkoutButton = page.getByRole('button', { name: /checkout/i })
    this.subtotal = page.getByTestId('subtotal')
    this.total = page.getByTestId('total')
  }

  getCartItem(productName: string) {
    return this.page.locator('[data-testid="cart-item"]', { hasText: productName })
  }

  async increaseQuantity(productName: string) {
    const item = this.getCartItem(productName)
    await item.getByRole('button', { name: /increase/i }).click()
  }

  async decreaseQuantity(productName: string) {
    const item = this.getCartItem(productName)
    await item.getByRole('button', { name: /decrease/i }).click()
  }

  async removeItem(productName: string) {
    const item = this.getCartItem(productName)
    await item.getByRole('button', { name: /remove/i }).click()
  }

  async getItemQuantity(productName: string) {
    const item = this.getCartItem(productName)
    return item.getByTestId('quantity').textContent()
  }
}

Nota: Agregar data-testid necesarios a CartItem y CartSummary.
```

---

## Paso 5: Test E2E - Flujo de Compra

```
Crea el test E2E del flujo completo.

Ubicación: e2e/shopping-journey.spec.ts

import { test, expect } from '@playwright/test'
import { ProductCatalogPage } from './pages/ProductCatalogPage'
import { ShoppingCartPage } from './pages/ShoppingCartPage'

test.describe('Shopping Journey', () => {
  let catalog: ProductCatalogPage
  let cart: ShoppingCartPage

  test.beforeEach(async ({ page }) => {
    // Limpiar localStorage antes de cada test
    // IMPORTANTE: NO usar addInitScript (se ejecuta en cada page load incluyendo reload)
    // En su lugar, navegar primero y luego limpiar con page.evaluate
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    catalog = new ProductCatalogPage(page)
    cart = new ShoppingCartPage(page)
    await page.reload()
  })

  test('should show empty cart initially', async () => {
    await expect(cart.emptyMessage).toBeVisible()
  })

  test('should add product to cart', async () => {
    await catalog.addToCart('Wireless Headphones')
    await expect(cart.getCartItem('Wireless Headphones')).toBeVisible()
    await expect(cart.emptyMessage).not.toBeVisible()
  })

  test('should increment quantity when adding same product', async () => {
    await catalog.addToCart('Wireless Headphones')
    await catalog.addToCart('Wireless Headphones')
    expect(await cart.getItemQuantity('Wireless Headphones')).toBe('2')
  })

  test('should update quantity with +/- buttons', async () => {
    await catalog.addToCart('Wireless Headphones')
    await cart.increaseQuantity('Wireless Headphones')
    expect(await cart.getItemQuantity('Wireless Headphones')).toBe('2')
    await cart.decreaseQuantity('Wireless Headphones')
    expect(await cart.getItemQuantity('Wireless Headphones')).toBe('1')
  })

  test('should remove item from cart', async () => {
    await catalog.addToCart('Wireless Headphones')
    await cart.removeItem('Wireless Headphones')
    await expect(cart.emptyMessage).toBeVisible()
  })

  test('should apply bulk discount for 5+ items', async () => {
    await catalog.addToCart('Wireless Headphones') // $79.99
    // Incrementar a 5
    for (let i = 0; i < 4; i++) {
      await cart.increaseQuantity('Wireless Headphones')
    }
    // Debería mostrar descuento bulk
    await expect(cart.page.getByText(/bulk discount/i)).toBeVisible()
  })

  test('should persist cart after refresh', async ({ page }) => {
    await catalog.addToCart('Wireless Headphones')
    await page.reload()
    await expect(cart.getCartItem('Wireless Headphones')).toBeVisible()
  })
})
```

---

## Paso 6: Agregar data-testid

```
Agrega los data-testid necesarios a los componentes.

ProductCard:
- data-testid="product-card"

CartItem:
- data-testid="cart-item"
- data-testid="quantity" (en el span con el número)

CartSummary:
- data-testid="subtotal"
- data-testid="total"
```

---

## Paso 7: Ejecutar Tests E2E

```bash
# Ejecutar tests
pnpm test:e2e

# Ver reporte
pnpm exec playwright show-report

# Ejecutar con UI (debug)
pnpm exec playwright test --ui
```

---

## Paso 8: Visual Regression (Opcional)

```
Crea test de regresión visual.

Ubicación: e2e/visual.spec.ts

import { test, expect } from '@playwright/test'

test('homepage visual', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveScreenshot('homepage.png', {
    maxDiffPixelRatio: 0.05,
  })
})

test('cart with items visual', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /add to cart/i }).first().click()
  await expect(page).toHaveScreenshot('cart-with-item.png')
})
```

**Generar snapshots base**:
```bash
pnpm test:e2e -- --update-snapshots
```

---

## Paso 9: Verificación Final COMPLETA

```bash
# A partir de ahora, SIEMPRE ejecutar verificación completa
pnpm test:run      # Tests unitarios
pnpm test:e2e      # Tests E2E
pnpm lint          # Sin errores de lint
pnpm typecheck     # Sin errores de tipos
pnpm build         # Build exitoso

# O usar el comando combinado (agregar a package.json):
# "verify": "pnpm lint && pnpm typecheck && pnpm test:run && pnpm test:e2e && pnpm build"
```

> ⚠️ **IMPORTANTE - VERIFICACIÓN COMPLETA**
> 
> A partir de este video, SIEMPRE ejecutar verificación completa antes de dar por terminado cualquier video:
> ```
> ✅ VERIFICACIÓN FINAL (OBLIGATORIO):
> pnpm test:run      # ¿Todos los unit tests pasan?
> pnpm test:e2e      # ¿E2E tests pasan?
> pnpm lint          # ¿Sin errores de lint?
> pnpm typecheck     # ¿Sin errores de tipos?
> pnpm build         # ¿Build exitoso?
> 
> ❌ NO CONTINUAR AL SIGUIENTE VIDEO si alguno falla.
> ```

---

## Checkpoint

Al final del video tienes:
- ✅ Playwright configurado
- ✅ Page Objects para Catalog y Cart
- ✅ 7 tests E2E del flujo de compra
- ✅ Test de persistencia
- ✅ (Opcional) Visual regression
- ✅ ~54 unit/integration + 7 E2E tests
- ✅ Verificación completa pasando
- ✅ **FLUJO COMPLETO TESTEADO** 🎉
