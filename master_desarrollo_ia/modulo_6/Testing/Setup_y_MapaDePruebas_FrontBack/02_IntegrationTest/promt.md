**Prompt:**  
Actúa como un desarrollador que practica *user-centric testing*.

## CONTEXTO
Los *integration tests* validan flujos de usuario con múltiples componentes conectados.  
Deben usar DOM real y buscar elementos como lo haría un usuario (priorizando `getByRole` sobre `getByTestId`).

## TAREA
Crea el componente **SimpleCounter** y su *integration test*.

## COMPONENTE – Requirements
- Estado inicial: `count = 0`
- UI: muestra `Count: {count}` con `data-testid="count-display"`
- Acción: botón **"Increment"** incrementa `count` en 1
- Framework: **React** con `useState`

## TEST – Requirements
- Framework: **Vitest + Testing Library**
- Imports: `render`, `screen`, `fireEvent` desde `@testing-library/react`
- Query prioritaria:  
  ```js
  getByRole('button', { name: /increment/i })
  ```
### Interacción
- `fireEvent.click()` para simular el click del usuario

### Assertion
- `expect().toHaveTextContent()` para verificar el texto

### Estructura
- Sigue el patrón **AAA** con comentarios

---

## ARCHIVOS
- `src/features/counter/SimpleCounter.tsx` (componente)
- `src/features/counter/SimpleCounter.test.tsx` (test)

---

## VALIDACIÓN
Ejecuta:

 ```bash
 pnpm test
 ```
## Aprende
`getByRole` busca elementos como lo haría un usuario real.





