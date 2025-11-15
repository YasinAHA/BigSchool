# Ejercicio 2: User Event Simulation

Actúa como un desarrollador que testa formularios con `userEvent`.

## Tarea
Crear componente **PriceCalculator** y su integration test.

## Componente
- Inputs: "Quantity", "Unit Price"
- total = quantity × unitPrice
- Muestra: "Total: $XX.XX"
Archivo: `src/features/calculator/PriceCalculator.tsx`

## Test
- Queries: `getByLabelText`
- Interacción:
```
await user.type(quantity, "3")
await user.type(unitPrice, "10.50")
```
- Expect: "Total: $31.50"
Archivo: `src/features/calculator/PriceCalculator.test.tsx`

## Validación
```
npm test
```
