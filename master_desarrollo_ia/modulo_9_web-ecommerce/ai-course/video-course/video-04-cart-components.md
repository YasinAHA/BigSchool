# Video 4: TDD - Componentes del Carrito (15 min)

## Resultado Final
CartItem y CartSummary testeados y funcionando.

---

> ⚠️ **RECORDATORIO TDD** (aplicar en todo este video):
> 1. Escribir tests PRIMERO → ejecutar → DEBE FALLAR (Red)
> 2. Implementar código MÍNIMO para pasar
> 3. Ejecutar tests → DEBEN PASAR (Green)
> 4. Refactorizar si es necesario

---

## Paso 1: TDD - CartItem

### 1.1 Test Primero (RED)

```
Crea el test para CartItem. El componente NO existe.

Ubicación: src/features/shopping-cart/components/CartItem.test.tsx

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CartItem } from './CartItem'

describe('CartItem', () => {
  const mockItem = {
    product: { id: 1, name: 'Test Product', price: 25, image: '/test.jpg', description: 'Test' },
    quantity: 2,
  }
  const mockOnUpdate = vi.fn()
  const mockOnRemove = vi.fn()

  beforeEach(() => vi.clearAllMocks())

  it('renders product name and price', () => {
    render(<CartItem item={mockItem} onUpdateQuantity={mockOnUpdate} onRemove={mockOnRemove} />)
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$25.00')).toBeInTheDocument()
  })

  it('renders quantity', () => {
    render(<CartItem item={mockItem} onUpdateQuantity={mockOnUpdate} onRemove={mockOnRemove} />)
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('renders subtotal (price × quantity)', () => {
    render(<CartItem item={mockItem} onUpdateQuantity={mockOnUpdate} onRemove={mockOnRemove} />)
    expect(screen.getByText('$50.00')).toBeInTheDocument()
  })

  it('calls onUpdateQuantity with incremented value when + clicked', async () => {
    const user = userEvent.setup()
    render(<CartItem item={mockItem} onUpdateQuantity={mockOnUpdate} onRemove={mockOnRemove} />)
    await user.click(screen.getByRole('button', { name: /increase/i }))
    expect(mockOnUpdate).toHaveBeenCalledWith(3)
  })

  it('calls onUpdateQuantity with decremented value when - clicked', async () => {
    const user = userEvent.setup()
    render(<CartItem item={mockItem} onUpdateQuantity={mockOnUpdate} onRemove={mockOnRemove} />)
    await user.click(screen.getByRole('button', { name: /decrease/i }))
    expect(mockOnUpdate).toHaveBeenCalledWith(1)
  })

  it('disables - button when quantity is 1', () => {
    render(<CartItem item={{ ...mockItem, quantity: 1 }} onUpdateQuantity={mockOnUpdate} onRemove={mockOnRemove} />)
    expect(screen.getByRole('button', { name: /decrease/i })).toBeDisabled()
  })

  it('calls onRemove when remove button clicked', async () => {
    const user = userEvent.setup()
    render(<CartItem item={mockItem} onUpdateQuantity={mockOnUpdate} onRemove={mockOnRemove} />)
    await user.click(screen.getByRole('button', { name: /remove/i }))
    expect(mockOnRemove).toHaveBeenCalled()
  })
})
```

**Ejecutar (RED)**:
```bash
pnpm test CartItem
```

### 1.2 Implementar (GREEN)

```
Implementa CartItem para pasar estos tests.

Ubicación: src/features/shopping-cart/components/CartItem.tsx

Props:
- item: CartItem (del tipo definido)
- onUpdateQuantity: (quantity: number) => void
- onRemove: () => void

Requisitos:
- Mostrar imagen pequeña (thumbnail)
- Nombre y precio unitario
- Botones +/- con aria-labels "Increase quantity" / "Decrease quantity"
- Botón - disabled cuando quantity === 1
- Botón remove con aria-label "Remove from cart"
- Subtotal (price × quantity)
- Estilos: flex row, border, padding
```

**Ejecutar (GREEN)**:
```bash
pnpm test CartItem
```

---

## Paso 2: TDD - CartSummary

### 2.1 Test Primero (RED)

```
Crea el test para CartSummary. El componente NO existe.

Ubicación: src/features/shopping-cart/components/CartSummary.test.tsx

import { render, screen } from '@testing-library/react'
import { CartSummary } from './CartSummary'

describe('CartSummary', () => {
  it('renders subtotal', () => {
    render(<CartSummary subtotal={100} discount={0} total={100} itemCount={3} />)
    expect(screen.getByText('Subtotal')).toBeInTheDocument()
    expect(screen.getAllByText('$100.00')).toHaveLength(2) // subtotal y total
  })

  it('renders discount when greater than 0', () => {
    render(<CartSummary subtotal={100} discount={15} total={85} itemCount={3} />)
    expect(screen.getByText('Discount')).toBeInTheDocument()
    expect(screen.getByText('-$15.00')).toBeInTheDocument()
  })

  it('hides discount when 0', () => {
    render(<CartSummary subtotal={50} discount={0} total={50} itemCount={2} />)
    expect(screen.queryByText('Discount')).not.toBeInTheDocument()
  })

  it('renders total', () => {
    render(<CartSummary subtotal={100} discount={15} total={85} itemCount={3} />)
    expect(screen.getByText('Total')).toBeInTheDocument()
    expect(screen.getByText('$85.00')).toBeInTheDocument()
  })

  it('shows promo message when subtotal < $100', () => {
    render(<CartSummary subtotal={80} discount={0} total={80} itemCount={2} />)
    expect(screen.getByText(/add \$20.00 more for 15% off/i)).toBeInTheDocument()
  })

  it('hides promo message when subtotal >= $100', () => {
    render(<CartSummary subtotal={100} discount={15} total={85} itemCount={3} />)
    expect(screen.queryByText(/add .* more for 15% off/i)).not.toBeInTheDocument()
  })

  it('renders checkout button', () => {
    render(<CartSummary subtotal={100} discount={0} total={100} itemCount={3} />)
    expect(screen.getByRole('button', { name: /checkout/i })).toBeInTheDocument()
  })
})
```

**Ejecutar (RED)**:
```bash
pnpm test CartSummary
```

### 2.2 Implementar (GREEN)

```
Implementa CartSummary para pasar estos tests.

Ubicación: src/features/shopping-cart/components/CartSummary.tsx

Props:
- subtotal: number
- discount: number
- total: number
- itemCount: number

Requisitos:
- Mostrar Subtotal con valor formateado
- Mostrar Discount solo si > 0 (con signo negativo)
- Mostrar Total con valor formateado
- Mensaje promo si subtotal < 100: "Add $XX.XX more for 15% off!"
- Botón "Checkout" (por ahora sin funcionalidad)
- Estilos: bg-gray-50, border, padding, sticky bottom
```

**Ejecutar (GREEN)**:
```bash
pnpm test CartSummary
```

---

## Paso 3: Index de Componentes

```
Crea index.ts para exportar los componentes del carrito.

Ubicación: src/features/shopping-cart/components/index.ts

export { CartItem } from './CartItem'
export { CartSummary } from './CartSummary'
```

---

## Paso 4: Preview en App (Temporal)

```
Agrega un preview temporal de CartItem y CartSummary en App.tsx.

Muestra:
- Un CartItem hardcodeado para ver el diseño
- Un CartSummary hardcodeado debajo

Solo para verificar visualmente, lo quitaremos en el siguiente video.
```

**Verificar**:
```bash
pnpm dev
```

---

## Paso 5: Verificación Final

```bash
# Ejecutar TODOS estos comandos - todos deben pasar
pnpm test:run      # Tests unitarios
pnpm build         # Build exitoso
```

---

## Checkpoint

Al final del video tienes:
- ✅ CartItem con 7 tests pasando (TDD)
- ✅ CartSummary con 7 tests pasando (TDD)
- ✅ Componentes exportados
- ✅ Preview visual funcionando
- ✅ ~30 tests totales pasando
- ✅ Build exitoso
