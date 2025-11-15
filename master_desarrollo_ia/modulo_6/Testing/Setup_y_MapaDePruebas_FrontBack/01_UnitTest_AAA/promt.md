# Prompt
Actúa como un desarrollador senior que escribe **unit tests**.

## CONTEXTO
Los **unit tests** deben ser:
- rápidos (<10ms),
- aislados,
- determinísticos,
- fáciles de mantener.

Son ideales para funciones puras y lógica de negocio.

## TAREA
Crear una función **calculateSubtotal** y su **test unitario**.

## ESPECIFICACIONES DE LA FUNCIÓN
- Recibe un array de `CartItem` con forma: `{ price: number, quantity: number }`
- Lógica: suma `price × quantity` de todos los items
- Implementación recomendada: `Array.reduce()`

## TEST – Requirements
- Framework: **Vitest**
  - Imports: `describe`, `it`, `expect` desde `'vitest'`
- Estructura: usar el patrón **AAA (Arrange–Act–Assert)** *con comentarios*
- Test data:  
  `[{ price: 10, quantity: 2 }, { price: 5.50, quantity: 1 }]`
- Resultado esperado: **25.50**

## ARCHIVOS
- `src/shared/utils/calculateSubtotal.ts` (función)
- `src/shared/utils/calculateSubtotal.test.ts` (test)

## Aprende
El patrón **AAA** hace que los tests sean **claros, legibles y mantenibles**, separando de forma explícita:
1. **Arrange** → Preparación  
2. **Act** → Ejecución  
3. **Assert** → Verificación
