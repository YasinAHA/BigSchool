# Integration Front — Exercises

Proyecto de ejercicios de testing (Testing Library + userEvent) para practicar.

Instrucciones rápidas:

- Instalar dependencias:

```bash
cd Testing\Integration_front
pnpm install
```

- Ejecutar tests:

```bash
pnpm test
```

Los ejercicios están en `tasks/` y los componentes/tests en `src/features`.

Estado actual:

- Tests: 2 passing (ejercicio 1 y 2).
- Advertencias: React mostró warnings sobre actualizaciones no envueltas en `act(...)` durante la ejecución de tests.

Commits por ejercicio

- Se recomienda crear un commit por ejercicio completado (como indica `rules.md`).

Comandos rápidos (Windows cmd):

```cmd
cd c:\Users\sdark\Desktop\BigSchool\master_desarrollo_ia\modulo_6\Testing\Integration_front
npm install
npm test
```

Para commitear por ejercicio:

```cmd
git add src/features/likes/LikeButton.tsx src/features/likes/LikeButton.test.tsx
git commit -m "ejercicio1: add LikeButton and test"

git add src/features/calculator/PriceCalculator.tsx src/features/calculator/PriceCalculator.test.tsx README.md
git commit -m "ejercicio2: add PriceCalculator and test; update README"
```

