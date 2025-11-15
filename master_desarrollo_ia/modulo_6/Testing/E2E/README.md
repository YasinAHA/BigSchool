# Proyecto E2E - Playwright

Este proyecto contiene ejercicios E2E y pruebas de regresión visual usando Playwright.

Cómo usar

1. Instalar dependencias:

```bash
npm install
```

2. Instalar navegadores de Playwright (sólo la primera vez):

```bash
npx playwright install
```

3. Ejecutar tests:

```bash
npm test
```

Notas

- Las pruebas están en la carpeta `tests/`.
- La configuración principal está en `playwright.config.ts`.
- Para pruebas visuales, las imágenes de referencia se almacenarán en `test-results/` o se generarán durante la primera ejecución.
