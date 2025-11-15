import { expect, test } from '@playwright/test';

test.describe('Visual regression - Cart', () => {
  test('Carrito con 1 ítem - snapshot visual', async ({ page }) => {
    await page.goto('/');

    // Agregar primer producto
    await page.getByRole('button', { name: 'Add to Cart' }).first().click();

    // Esperar que el contador del carrito muestre 1
    await expect(page.getByTestId('cart-count')).toHaveText('1');

    // Capturar screenshot con tolerancia de hasta 100 pixels
    await expect(page).toHaveScreenshot('cart-with-item.png', { maxDiffPixels: 100 });
  });
});
