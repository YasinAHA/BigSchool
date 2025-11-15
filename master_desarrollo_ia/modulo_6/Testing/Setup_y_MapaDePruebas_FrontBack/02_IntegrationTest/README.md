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

---

Configuraciones añadidas por este ejemplo:

- `package.json` con script `test` que ejecuta `vitest` y configuración para usar `jsdom` y el archivo de setup.
- `tsconfig.json` con opciones mínimas para TypeScript + React (`jsx: react-jsx`) y tipos de `vitest`.
- `vitest.setup.ts` que importa `@testing-library/jest-dom` para las aserciones.

Comandos concretos para Windows (`cmd.exe`) desde la raíz del proyecto:

```cmd
cd /d C:\Users\sdark\Desktop\BigSchool\master_desarrollo_ia\modulo_6\Testing\Setup_y_MapaDePruebas_FrontBack\02_IntegrationTest
pnpm init -y
pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom
pnpm add react react-dom
```

Si no usas `pnpm`, con `npm` (ejecutar en `cmd.exe`):

```cmd
cd /d C:\Users\sdark\Desktop\BigSchool\master_desarrollo_ia\modulo_6\Testing\Setup_y_MapaDePruebas_FrontBack\02_IntegrationTest
npm init -y
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
npm install react react-dom
```

Luego ejecutar las pruebas con:

```cmd
pnpm test
```
o con `npm`:

```cmd
npm run test
```

Si quieres que cree o ejecute las instalaciones aquí, dime y las realizo.
