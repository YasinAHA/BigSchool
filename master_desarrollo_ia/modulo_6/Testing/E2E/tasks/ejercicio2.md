# Ejercicio 2: Visual Regression

Actúa como un desarrollador que implementa **Visual Regression Testing** con Playwright.

## Tarea

Crear un test de regresión visual para el carrito con un ítem.

Ejercicio 2: Visual Regression
Actúa como un desarrollador que implementa Visual Regression Testing.
CONTEXTO: Visual Regression Testing (testing de regresión visual) detecta
cambios visuales no intencionales comparando screenshots pixel-por-pixel.
Primera ejecución: Playwright captura "baseline" (imagen de referencia).
Siguientes ejecuciones: Compara nueva captura con baseline. Si hay diferencias,
test FALLA y genera diff visual. maxDiffPixels permite tolerar pequeñas
diferencias (fuentes, antialiasing).
TAREA: Crea test de visual regression para carrito con item.
TEST FLOW:
1. Navegar a home: page.goto('/')
2. Agregar primer producto al carrito (click "Add to Cart")
3. Esperar que cart-count muestre "1" (sincronización)
4. Capturar screenshot: expect(page).toHaveScreenshot('cart-with-item.png')
5. Configurar tolerancia: maxDiffPixels: 100
TEST REQUIREMENTS:
- Framework: Playwright (@playwright/test)
- Assertion: toHaveScreenshot() con opciones
- Tolerancia: maxDiffPixels: 100 (permite hasta 100 pixels diferentes)
- Sincronización: esperar cart-count antes del screenshot
PRIMERA EJECUCIÓN:
- Playwright guardará baseline en: e2e/__screenshots__/cart-with-item.png
- Test PASARÁ (no hay baseline aún para comparar)
SIGUIENTES EJECUCIONES:
- Compara nuevo screenshot con baseline
- Si hay cambios CSS/layout, test FALLA y muestra diff visual
ARCHIVOS:
- e2e/visual-regression.spec.ts (test visual)
VALIDACIÓN: ejecuta pnpm test:e2e --update-snapshots (primera vez)
Aprende: Visual regression testing automático con Playwright