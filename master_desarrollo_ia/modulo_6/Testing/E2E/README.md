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

4. Levantar la aplicación bajo prueba

Los tests usan `page.goto('/')` y dependen de que la aplicación esté servida en `http://localhost:3000`.
Antes de ejecutar los tests asegúrate de levantar tu servidor (por ejemplo):

```cmd
cd c:\ruta\a\tu\proyecto
npm run dev
```

Si tu app usa otro puerto, actualiza `baseURL` en `playwright.config.ts`.

Notas

- Las pruebas están en la carpeta `tests/`.
- La configuración principal está en `playwright.config.ts`.
- Para pruebas visuales, las imágenes de referencia se almacenarán en `test-results/` o se generarán durante la primera ejecución.
