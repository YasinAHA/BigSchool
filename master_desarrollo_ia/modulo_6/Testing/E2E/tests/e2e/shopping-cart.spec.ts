import { expect, test } from '@playwright/test';

test.describe('Shopping cart - E2E', () => {
  test('Agregar producto al carrito (User Journey)', async ({ page }) => {
    await page.goto('/');

    // Cambiar a vista E-commerce
    await page.getByRole('button', { name: 'E-commerce Demo' }).click();

    // Verificar que los productos cargaron
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();

    // Agregar primer producto
    await page.getByRole('button', { name: 'Add to Cart' }).first().click();

    // Verificar resumen del carrito
    await expect(page.getByTestId('cart-summary')).toBeVisible();
  });
});
