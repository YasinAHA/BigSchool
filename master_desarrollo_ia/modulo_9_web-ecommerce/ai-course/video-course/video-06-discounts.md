# Video 6: TDD - Sistema de Descuentos con Strategy Pattern (15 min)

## Resultado Final
Descuentos bulk y order funcionando con Strategy Pattern.

---

> ⚠️ **RECORDATORIO TDD** (aplicar en todo este video):
> 1. Escribir tests PRIMERO → ejecutar → DEBE FALLAR (Red)
> 2. Implementar código MÍNIMO para pasar
> 3. Ejecutar tests → DEBEN PASAR (Green)
> 4. Refactorizar si es necesario

---

## Paso 1: Interface DiscountStrategy

```
Crea la interface para las estrategias de descuento.

Ubicación: src/shared/strategies/DiscountStrategy.ts

import { CartItem } from '../types'

export interface DiscountStrategy {
  name: string
  description: string
  isApplicable(items: CartItem[], subtotal: number): boolean
  calculate(items: CartItem[], subtotal: number): number
}
```

---

## Paso 2: TDD - BulkDiscountStrategy

### 2.1 Test Primero (RED)

```
Crea el test para BulkDiscountStrategy. La clase NO existe.

Ubicación: src/shared/strategies/BulkDiscountStrategy.test.ts

import { BulkDiscountStrategy } from './BulkDiscountStrategy'
import { CartItem } from '../types'

const makeItem = (price: number, quantity: number): CartItem => ({
  product: { id: 1, name: 'Test', price, image: '', description: '' },
  quantity
})

describe('BulkDiscountStrategy', () => {
  const strategy = new BulkDiscountStrategy()

  it('has correct name', () => {
    expect(strategy.name).toBe('Bulk Discount')
  })

  it('is not applicable for < 5 items', () => {
    expect(strategy.isApplicable([makeItem(10, 4)], 40)).toBe(false)
  })

  it('is applicable for >= 5 items', () => {
    expect(strategy.isApplicable([makeItem(10, 5)], 50)).toBe(true)
  })

  it('calculates 10% discount', () => {
    expect(strategy.calculate([makeItem(10, 5)], 50)).toBe(5)
  })

  it('only discounts items with 5+ quantity', () => {
    const items = [makeItem(10, 3), makeItem(20, 5)]
    expect(strategy.calculate(items, 130)).toBe(10) // Solo $100 * 10%
  })
})
```

**Ejecutar (RED)**:
```bash
pnpm test BulkDiscountStrategy
```

### 2.2 Implementar (GREEN)

```
Implementa BulkDiscountStrategy para pasar los tests.

Ubicación: src/shared/strategies/BulkDiscountStrategy.ts

Usa businessRules.bulkDiscount.threshold y percentage.
```

**Ejecutar (GREEN)**:
```bash
pnpm test BulkDiscountStrategy
```

---

## Paso 3: TDD - OrderDiscountStrategy

### 3.1 Test Primero (RED)

```
Crea el test para OrderDiscountStrategy.

Ubicación: src/shared/strategies/OrderDiscountStrategy.test.ts

import { OrderDiscountStrategy } from './OrderDiscountStrategy'
import { CartItem } from '../types'

const makeItem = (price: number, quantity: number): CartItem => ({
  product: { id: 1, name: 'Test', price, image: '', description: '' },
  quantity
})

describe('OrderDiscountStrategy', () => {
  const strategy = new OrderDiscountStrategy()

  it('has correct name', () => {
    expect(strategy.name).toBe('Order Discount')
  })

  it('is not applicable for subtotal < $100', () => {
    expect(strategy.isApplicable([makeItem(10, 5)], 50)).toBe(false)
  })

  it('is applicable for subtotal >= $100', () => {
    expect(strategy.isApplicable([makeItem(50, 2)], 100)).toBe(true)
  })

  it('calculates 15% discount', () => {
    expect(strategy.calculate([makeItem(50, 2)], 100)).toBe(15)
  })
})
```

**Ejecutar (RED)**:
```bash
pnpm test OrderDiscountStrategy
```

### 3.2 Implementar (GREEN)

```
Implementa OrderDiscountStrategy para pasar los tests.

Ubicación: src/shared/strategies/OrderDiscountStrategy.ts
```

**Ejecutar (GREEN)**:
```bash
pnpm test OrderDiscountStrategy
```

---

## Paso 4: TDD - DiscountCalculator

### 4.1 Test Primero (RED)

```
Crea el test para DiscountCalculator.

Ubicación: src/shared/strategies/DiscountCalculator.test.ts

import { DiscountCalculator } from './DiscountCalculator'
import { CartItem } from '../types'

const makeItem = (price: number, quantity: number): CartItem => ({
  product: { id: 1, name: 'Test', price, image: '', description: '' },
  quantity
})

describe('DiscountCalculator', () => {
  const calculator = new DiscountCalculator()

  it('returns 0 for empty cart', () => {
    expect(calculator.calculate([], 0)).toBe(0)
  })

  it('applies only bulk discount when applicable', () => {
    const items = [makeItem(10, 5)] // $50, bulk applies
    expect(calculator.calculate(items, 50)).toBe(5) // 10%
  })

  it('applies only order discount when applicable', () => {
    const items = [makeItem(50, 2)] // $100, no bulk (qty < 5), order applies
    expect(calculator.calculate(items, 100)).toBe(15) // 15%
  })

  it('applies both discounts when both applicable', () => {
    const items = [makeItem(25, 5)] // $125, bulk AND order apply
    // Bulk: $125 * 10% = $12.50
    // Order: ($125 - $12.50) * 15% = $16.875
    // Total: $29.375
    expect(calculator.calculate(items, 125)).toBeCloseTo(29.375, 2)
  })

  it('returns discount breakdown', () => {
    const items = [makeItem(25, 5)] // $125
    const breakdown = calculator.getBreakdown(items, 125)
    expect(breakdown).toHaveLength(2)
    expect(breakdown[0].name).toBe('Bulk Discount')
    expect(breakdown[1].name).toBe('Order Discount')
  })
})
```

**Ejecutar (RED)**:
```bash
pnpm test DiscountCalculator
```

### 4.2 Implementar (GREEN)

```
Implementa DiscountCalculator para pasar los tests.

Ubicación: src/shared/strategies/DiscountCalculator.ts

Requisitos:
- Registra BulkDiscountStrategy y OrderDiscountStrategy
- calculate(): aplica estrategias secuencialmente
- getBreakdown(): retorna array con { name, amount } de cada descuento aplicado
```

**Ejecutar (GREEN)**:
```bash
pnpm test DiscountCalculator
```

---

## Paso 5: Integrar en CartContext

```
Actualiza CartContext para calcular descuentos.

Cambios en CartContext:
- Importar DiscountCalculator
- Agregar valores computados:
  - discount: calculator.calculate(items, subtotal)
  - total: subtotal - discount
  - discountBreakdown: calculator.getBreakdown(items, subtotal)

Actualiza los tests de CartContext si es necesario.
```

**Verificar**:
```bash
pnpm test CartContext
```

---

## Paso 6: Mostrar Descuentos en CartSummary

```
Actualiza CartSummary para mostrar breakdown de descuentos.

Cambios:
- Recibir discountBreakdown como prop
- Mostrar cada descuento por separado (si hay)
- Actualizar mensaje promo dinámicamente

Actualiza los tests de CartSummary.
```

**Verificar**:
```bash
pnpm test CartSummary
pnpm dev
```

Probar:
1. Agregar 5+ de un producto → ver "Bulk Discount: -$X.XX"
2. Llegar a $100+ → ver "Order Discount: -$X.XX"
3. Ambos a la vez → ver ambos descuentos

---

## Paso 7: Verificación Final

```bash
# Ejecutar TODOS estos comandos - todos deben pasar
pnpm test:run      # Tests unitarios
pnpm build         # Build exitoso
```

---

## Checkpoint

Al final del video tienes:
- ✅ BulkDiscountStrategy con 5 tests (TDD)
- ✅ OrderDiscountStrategy con 4 tests (TDD)
- ✅ DiscountCalculator con 5 tests (TDD)
- ✅ CartContext calculando descuentos
- ✅ CartSummary mostrando breakdown
- ✅ ~54 tests totales pasando
- ✅ Build exitoso
- ✅ **DESCUENTOS FUNCIONANDO** 🎉
