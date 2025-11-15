# SimpleCounter - Integration Test Example

Ejemplo sencillo que cumple las directrices en `promt.md`.

Archivos creados:
- `src/features/counter/SimpleCounter.tsx` (componente React con `useState`)
- `src/features/counter/SimpleCounter.test.tsx` (test de integración con Vitest + Testing Library)

Notas y pasos para ejecutar (si quieres correr localmente):

1. Asegúrate de tener `node` y un gestor de paquetes (`pnpm` recomendado o `npm`).
2. En la carpeta `02_IntegrationTest` inicializa e instala dependencias:

```bash
cd Testing/Setup_y_MapaDePruebas_FrontBack/02_IntegrationTest
pnpm init -y
pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom @types/react @types/react-dom react react-dom
```

3. Añade en `package.json` un script de prueba:

```json
"scripts": {
  "test": "vitest"
}
```

4. Ejecuta las pruebas:

```bash
pnpm test
```

El test usa `getByRole('button', { name: /increment/i })` y `fireEvent.click()` como indica la especificación.
