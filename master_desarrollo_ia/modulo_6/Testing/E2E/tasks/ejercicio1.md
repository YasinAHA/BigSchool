# Ejercicio 1: E2E Básico con Playwright

Actúa como un desarrollador que escribe **E2E tests con Playwright**.

## Tarea

Crear un test E2E para agregar producto al carrito siguiendo el User Journey indicado.

Ejercicio 1: E2E Básico con Playwright

Actúa como un desarrollador que escribe E2E tests con Playwright.
CONTEXTO: E2E tests validan el sistema completo: Browser + Frontend +
Backend + Database. Playwright provee auto-wait inteligente (espera
automáticamente a que elementos estén listos). Selectores estables:
getByRole > getByLabelText > getByTestId. Los E2E tests siguen User
Journeys (viajes de usuario): flujos completos que usuarios reales ejecutan.
TAREA: Crea test E2E para agregar producto al carrito.
USER JOURNEY:
1. Navegar a home: page.goto('/')
2. Cambiar a vista E-commerce: click botón "E-commerce Demo"
3. Verificar productos cargaron: heading "Products" visible
4. Agregar primer producto: click botón "Add to Cart"
5. Verificar éxito: cart-summary debe ser visible
TEST REQUIREMENTS:
- Framework: Playwright (@playwright/test)
- Imports: test, expect
- Selectores: getByRole prioritario, getByTestId para cart-summary
- Estructura: test.describe + test
- Auto-wait: NO necesitas waitFor(), Playwright espera automáticamente
ARCHIVOS:
- e2e/shopping-cart.spec.ts (test E2E)
VALIDACIÓN: ejecuta pnpm test:e2e para verificar
Aprende: Navegación entre vistas + flujo E2E con getByRole