# Video 3: TDD - Lógica de Negocio (15 min)

## Resultado Final
Funciones calculateSubtotal y formatPrice testeadas y funcionando.

---

> ## 🎯 METODOLOGÍA TDD - APLICAR EN TODO EL RESTO DEL CURSO
> 
> A partir de este video, SIEMPRE seguir el ciclo Red-Green-Refactor:
> 
> ```
> 1. RED:    Escribir test PRIMERO → ejecutar → DEBE FALLAR
> 2. GREEN:  Implementar código MÍNIMO para pasar el test
> 3. REFACTOR: Mejorar el código manteniendo tests verdes
> ```
> 
> **Esta metodología se aplica a TODAS las funciones y componentes de aquí en adelante.**

---

## Reglas de Negocio

```
DESCUENTO POR CANTIDAD (Bulk):  5+ unidades = 10% off
DESCUENTO POR ORDEN (Order):    $100+ = 15% off
```

---

## Paso 1: TDD - formatPrice

### 1.1 Test Primero (RED)

```
Crea el test para formatPrice. La función NO existe.

Ubicación: src/shared/utils/formatPrice.test.ts

import { formatPrice } from './formatPrice'

describe('formatPrice', () => {
  it('formats 10 as $10.00', () => {
    expect(formatPrice(10)).toBe('$10.00')
  })

  it('formats 19.99 as $19.99', () => {
    expect(formatPrice(19.99)).toBe('$19.99')
  })

  it('formats 0 as $0.00', () => {
    expect(formatPrice(0)).toBe('$0.00')
  })

  it('formats 1234.5 as $1,234.50', () => {
    expect(formatPrice(1234.5)).toBe('$1,234.50')
  })
})
```

**Ejecutar (RED)**:
```bash
pnpm test formatPrice
```

### 1.2 Implementar (GREEN)

```
Implementa formatPrice para pasar estos tests.

Ubicación: src/shared/utils/formatPrice.ts

Usa Intl.NumberFormat con locale 'en-US' y currency 'USD'.
```

**Ejecutar (GREEN)**:
```bash
pnpm test formatPrice
```

---

## Paso 2: TDD - calculateSubtotal

### 2.1 Test Primero (RED)

```
Crea el test para calculateSubtotal. La función NO existe.

Ubicación: src/shared/utils/calculateSubtotal.test.ts

import { calculateSubtotal } from './calculateSubtotal'
import { CartItem } from '@/shared/types'

describe('calculateSubtotal', () => {
  it('returns 0 for empty cart', () => {
    expect(calculateSubtotal([])).toBe(0)
  })

  it('calculates subtotal for single item', () => {
    const items: CartItem[] = [
      { product: { id: 1, name: 'A', price: 10, image: '', description: '' }, quantity: 2 }
    ]
    expect(calculateSubtotal(items)).toBe(20)
  })

  it('calculates subtotal for multiple items', () => {
    const items: CartItem[] = [
      { product: { id: 1, name: 'A', price: 10, image: '', description: '' }, quantity: 2 },
      { product: { id: 2, name: 'B', price: 5, image: '', description: '' }, quantity: 3 }
    ]
    expect(calculateSubtotal(items)).toBe(35) // 20 + 15
  })
})
```

**Ejecutar (RED)**:
```bash
pnpm test calculateSubtotal
```

### 2.2 Implementar (GREEN)

```
Implementa calculateSubtotal para pasar estos tests.

Ubicación: src/shared/utils/calculateSubtotal.ts

Usa reduce para sumar price * quantity de cada item.
```

**Ejecutar (GREEN)**:
```bash
pnpm test calculateSubtotal
```

---

## Paso 3: Constantes de Negocio

```
Crea las constantes de reglas de negocio.

Ubicación: src/shared/constants/businessRules.ts

export const businessRules = {
  bulkDiscount: {
    threshold: 5,      // 5+ items
    percentage: 0.1,   // 10% off
  },
  orderDiscount: {
    threshold: 100,    // $100+
    percentage: 0.15,  // 15% off
  },
  quantity: {
    min: 1,
    max: 99,
  },
} as const
```

---

## Paso 4: TDD - calculateBulkDiscount

### 4.1 Test Primero (RED)

```
Crea el test para calculateBulkDiscount.

Ubicación: src/shared/utils/calculateBulkDiscount.test.ts

import { calculateBulkDiscount } from './calculateBulkDiscount'
import { CartItem } from '@/shared/types'

describe('calculateBulkDiscount', () => {
  const makeItem = (price: number, quantity: number): CartItem => ({
    product: { id: 1, name: 'Test', price, image: '', description: '' },
    quantity
  })

  it('returns 0 for less than 5 items', () => {
    expect(calculateBulkDiscount([makeItem(10, 4)])).toBe(0)
  })

  it('calculates 10% discount for 5 items', () => {
    expect(calculateBulkDiscount([makeItem(10, 5)])).toBe(5) // $50 * 10% = $5
  })

  it('calculates 10% discount for 10 items', () => {
    expect(calculateBulkDiscount([makeItem(10, 10)])).toBe(10) // $100 * 10% = $10
  })

  it('only applies to items with 5+ quantity', () => {
    const items = [makeItem(10, 3), makeItem(20, 5)] // Solo el segundo aplica
    expect(calculateBulkDiscount(items)).toBe(10) // $100 * 10% = $10
  })
})
```

**Ejecutar (RED)**:
```bash
pnpm test calculateBulkDiscount
```

### 4.2 Implementar (GREEN)

```
Implementa calculateBulkDiscount para pasar estos tests.

Ubicación: src/shared/utils/calculateBulkDiscount.ts

Usa businessRules.bulkDiscount.threshold y percentage.
Solo aplica descuento a items con quantity >= threshold.
```

**Ejecutar (GREEN)**:
```bash
pnpm test calculateBulkDiscount
```

---

## Paso 5: Index de Utils

```
Crea index.ts para exportar todas las utils.

Ubicación: src/shared/utils/index.ts

export { formatPrice } from './formatPrice'
export { calculateSubtotal } from './calculateSubtotal'
export { calculateBulkDiscount } from './calculateBulkDiscount'
```

---

## Paso 6: Actualizar ProductCard con formatPrice

```
Actualiza ProductCard para usar formatPrice en vez de template literal.

Cambio:
- Antes: ${product.price}
- Después: {formatPrice(product.price)}

Los tests deben seguir pasando.
```

**Verificar**:
```bash
pnpm test
```

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
- ✅ formatPrice con 4 tests pasando
- ✅ calculateSubtotal con 3 tests pasando
- ✅ businessRules centralizadas
- ✅ calculateBulkDiscount con 4 tests pasando
- ✅ ProductCard usando formatPrice
- ✅ ~16 tests totales pasando
- ✅ Build exitoso

---

## 📌 Recordatorio para Videos Siguientes

A partir de ahora, SIEMPRE aplicar TDD:
```
⚠️ RECORDATORIO TDD:
- Escribir tests PRIMERO
- Verificar que FALLAN (Red)
- Implementar código mínimo
- Verificar que PASAN (Green)
- Refactorizar si es necesario
```
