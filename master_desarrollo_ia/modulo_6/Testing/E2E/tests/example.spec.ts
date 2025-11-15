import { expect, test } from '@playwright/test';

test('Example.com - página principal - snapshot visual', async ({ page }) => {
  await page.goto('https://example.com');
  // Espera principal del contenido
  await expect(page.locator('h1')).toHaveText(/Example Domain/);
  // Tomar screenshot para regresión visual
  await expect(page).toHaveScreenshot('example-home.png');
});
