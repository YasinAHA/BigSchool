# Video 5: TDD - CartContext + Carrito Completo (15 min)

## Resultado Final
Carrito de compras completamente funcional con estado global.

---

> ⚠️ **RECORDATORIO TDD** (aplicar en todo este video):
> 1. Escribir tests PRIMERO → ejecutar → DEBE FALLAR (Red)
> 2. Implementar código MÍNIMO para pasar
> 3. Ejecutar tests → DEBEN PASAR (Green)
> 4. Refactorizar si es necesario

---

## Paso 1: TDD - CartContext

### 1.1 Test Primero (RED)

```
Crea el test para CartContext. El context NO existe.

Ubicación: src/context/CartContext.test.tsx

import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from './CartContext'
import { ReactNode } from 'react'

const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
)

describe('CartContext', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 25,
    image: '/test.jpg',
    description: 'Test'
  }

  beforeEach(() => {
    localStorage.clear()
  })

  it('starts with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.items).toHaveLength(0)
    expect(result.current.itemCount).toBe(0)
    expect(result.current.subtotal).toBe(0)
  })

  it('adds new product with quantity 1', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(1)
  })

  it('increments quantity when adding existing product', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.addItem(mockProduct))
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
  })

  it('updates quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.updateQuantity(1, 5))
    expect(result.current.items[0].quantity).toBe(5)
  })

  it('removes item when quantity set to 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.updateQuantity(1, 0))
    expect(result.current.items).toHaveLength(0)
  })

  it('removes item', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.removeItem(1))
    expect(result.current.items).toHaveLength(0)
  })

  it('clears cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.addItem({ ...mockProduct, id: 2 }))
    act(() => result.current.clearCart())
    expect(result.current.items).toHaveLength(0)
  })

  it('calculates itemCount correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.addItem({ ...mockProduct, id: 2 }))
    expect(result.current.itemCount).toBe(3) // 2 + 1
  })

  it('calculates subtotal correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct)) // $25
    act(() => result.current.addItem(mockProduct)) // $25 más
    expect(result.current.subtotal).toBe(50)
  })
})
```

**Ejecutar (RED)**:
```bash
pnpm test CartContext
```

### 1.2 Implementar (GREEN)

```
Implementa CartContext para pasar estos tests.

Ubicación: src/context/CartContext.tsx

Exportar:
- CartProvider: wrapper component
- useCart: hook para acceder al context

Estado (useReducer con lazy initializer):
- items: CartItem[]
- Usar función getInitialState() para cargar de localStorage al inicializar
- NO usar useEffect para cargar el estado inicial (causa race condition)

Acciones:
- addItem(product): agrega o incrementa
- removeItem(productId): elimina del carrito
- updateQuantity(productId, quantity): actualiza cantidad (0 = eliminar)
- clearCart(): vacía el carrito

Valores computados:
- itemCount: suma de todas las cantidades
- subtotal: suma de (price × quantity)

Persistir en localStorage:
- Usar useRef isInitialMount para evitar guardar en el primer render
- Solo guardar después de cambios reales del usuario

IMPORTANTE - Patrón correcto para localStorage:
const [state, dispatch] = useReducer(cartReducer, undefined, getInitialState)
const isInitialMount = useRef(true)

useEffect(() => {
  if (isInitialMount.current) {
    isInitialMount.current = false
    return
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
}, [state.items])
```

**Ejecutar (GREEN)**:
```bash
pnpm test CartContext
```

---

## Paso 2: ShoppingCart Component

```
Crea el componente ShoppingCart que integra todo.

Ubicación: src/features/shopping-cart/ShoppingCart.tsx

Requisitos:
- Título "Shopping Cart" con badge de itemCount
- Si vacío: mensaje "Your cart is empty" con icono
- Si tiene items: lista de CartItem
- CartSummary al final
- Usa useCart para obtener datos y funciones

No necesita tests propios - es integración de componentes ya testeados.
```

---

## Paso 3: Integrar en App

```
Actualiza App.tsx para el layout final.

Requisitos:
- CartProvider envolviendo todo
- Header: logo "Simple Product Shop" + icono carrito con badge
- Layout 2 columnas (desktop):
  - Izquierda (2/3): ProductCatalog
  - Derecha (1/3): ShoppingCart (sticky)
- Mobile: stack vertical
- ProductCatalog pasa addItem del context a cada ProductCard
```

---

## Paso 4: Feedback Visual al Agregar

```
Agrega feedback cuando se agrega un producto al carrito.

En ProductCard:
- Estado local: 'idle' | 'added'
- Al hacer click: cambiar a 'added' por 1.5 segundos
- Botón muestra "Added!" en verde cuando added
- Vuelve a "Add to Cart" después

Actualiza el test de ProductCard si es necesario.
```

**Verificar**:
```bash
pnpm test ProductCard
pnpm dev
```

---

## Paso 5: Probar Flujo Completo

```bash
pnpm dev
```

Probar manualmente:
1. ✅ Agregar producto → aparece en carrito
2. ✅ Agregar mismo producto → incrementa cantidad
3. ✅ Botones +/- funcionan
4. ✅ Botón remove elimina
5. ✅ Subtotal se actualiza
6. ✅ Mensaje promo aparece/desaparece
7. ✅ Refresh mantiene carrito (localStorage)

---

## Paso 6: Verificación Final

```bash
# Ejecutar TODOS estos comandos - todos deben pasar
pnpm test:run      # Tests unitarios
pnpm build         # Build exitoso
```

---

## Checkpoint

Al final del video tienes:
- ✅ CartContext con 9 tests pasando (TDD)
- ✅ ShoppingCart integrado
- ✅ Layout completo 2 columnas
- ✅ Flujo agregar → carrito funcionando
- ✅ Persistencia en localStorage
- ✅ Feedback visual al agregar
- ✅ ~39 tests totales pasando
- ✅ Build exitoso
- ✅ **CARRITO FUNCIONAL** 🎉
