# Video 10: Accesibilidad + UX (15 min)

## Resultado Final
App accesible WCAG AA con skeleton screens y optimistic UI.

---

> ⚠️ **RECORDATORIO TDD** (aplicar a los nuevos componentes):
> 1. Escribir tests PRIMERO → ejecutar → DEBE FALLAR (Red)
> 2. Implementar código MÍNIMO para pasar
> 3. Ejecutar tests → DEBEN PASAR (Green)
>
> **Esto aplica a: Skeleton y Toast**

---

## Paso 1: Instalar Plugin de A11y

```bash
pnpm add -D eslint-plugin-jsx-a11y
```

```
Agrega jsx-a11y a eslint.config.js.

import jsxA11y from 'eslint-plugin-jsx-a11y'

// En config:
plugins: { 'jsx-a11y': jsxA11y },
rules: {
  ...jsxA11y.configs.recommended.rules,
}
```

```bash
pnpm lint
```

Ver errores de accesibilidad y corregir.

---

## Paso 2: ARIA Labels en Botones con Íconos

```
Agrega aria-labels a todos los botones que solo tienen íconos.

CartItem - botones +/-:
<button aria-label="Increase quantity of {productName}">+</button>
<button aria-label="Decrease quantity of {productName}">-</button>
<button aria-label="Remove {productName} from cart">🗑️</button>

Header - carrito:
<button aria-label={`View cart, ${itemCount} items`}>🛒</button>

ProductCard - add to cart (si solo tiene ícono):
<button aria-label={`Add ${productName} to cart`}>+</button>
```

---

## Paso 3: Focus Visible

```
Agrega estilos de focus visible a todos los elementos interactivos.

En index.css o globals:

/* Focus visible para todos los interactivos */
button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible {
  outline: 3px solid #3b82f6;
  outline-offset: 2px;
}

/* Quitar outline default solo si focus-visible está soportado */
button:focus:not(:focus-visible) {
  outline: none;
}
```

---

## Paso 4: Navegación por Teclado

```
Verifica y corrige la navegación por teclado.

Prueba manual:
1. Tab desde el inicio → debe ir en orden lógico
2. Enter/Space en botones → deben activarse
3. Escape en modales → debe cerrar
4. Tab no debe quedar "atrapado"

Corregir si es necesario:
- Agregar tabIndex={0} a elementos custom clickeables
- Usar <button> en vez de <div onClick>
- Orden de tab lógico (arriba→abajo, izq→der)
```

---

## Paso 5: TDD - Skeleton Screens

### 5.1 Test Primero (RED)

```
Crea el test para Skeleton. El componente NO existe.

Ubicación: src/shared/components/Skeleton.test.tsx

import { render, screen } from '@testing-library/react'
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  it('renders with pulse animation', () => {
    render(<Skeleton />)
    const skeleton = screen.getByRole('status', { hidden: true })
    expect(skeleton).toHaveClass('animate-pulse')
  })

  it('renders as text variant by default', () => {
    render(<Skeleton />)
    const skeleton = screen.getByRole('status', { hidden: true })
    expect(skeleton).toHaveClass('rounded')
  })

  it('accepts custom width and height', () => {
    render(<Skeleton width="100px" height="20px" />)
    const skeleton = screen.getByRole('status', { hidden: true })
    expect(skeleton).toHaveStyle({ width: '100px', height: '20px' })
  })

  it('renders as circular variant', () => {
    render(<Skeleton variant="circular" />)
    const skeleton = screen.getByRole('status', { hidden: true })
    expect(skeleton).toHaveClass('rounded-full')
  })
})
```

**Ejecutar (RED)**:
```bash
pnpm test Skeleton
```

### 5.2 Implementar (GREEN)

```
Implementa Skeleton para pasar los tests.

Ubicación: src/shared/components/Skeleton.tsx

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'rectangular' | 'circular'
  width?: string | number
  height?: string | number
}

export function Skeleton({ className, variant = 'text', width, height }: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gray-200'
  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded',
    circular: 'rounded-full',
  }

  return (
    <div
      role="status"
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}
```

**Ejecutar (GREEN)**:
```bash
pnpm test Skeleton
```

---

## Paso 6: ProductCardSkeleton

```
Crea skeleton para ProductCard.

Ubicación: src/features/product-catalog/components/ProductCardSkeleton.tsx

import { Skeleton } from '@/shared/components/Skeleton'

export function ProductCardSkeleton() {
  return (
    <div className="border rounded-lg p-4">
      <Skeleton variant="rectangular" height={200} className="mb-4" />
      <Skeleton variant="text" width="80%" className="mb-2" />
      <Skeleton variant="text" width="40%" className="mb-4" />
      <Skeleton variant="rectangular" height={40} />
    </div>
  )
}

Usar en ProductCatalog mientras carga (simular con setTimeout si no hay API).
```

---

## Paso 7: Optimistic UI en Add to Cart

```
Actualiza ProductCard para optimistic UI.

Estados del botón:
- idle: "Add to Cart" (azul)
- loading: "Adding..." (gris, spinner)
- success: "Added!" (verde, checkmark)
- error: "Failed" (rojo, retry)

type ButtonState = 'idle' | 'loading' | 'success' | 'error'

const [state, setState] = useState<ButtonState>('idle')

const handleAdd = async () => {
  setState('loading')
  try {
    onAddToCart(product)
    setState('success')
    setTimeout(() => setState('idle'), 1500)
  } catch {
    setState('error')
    setTimeout(() => setState('idle'), 3000)
  }
}

Estilos según estado:
- idle: bg-indigo-600 hover:bg-indigo-700
- loading: bg-indigo-400 cursor-not-allowed
- success: bg-green-600
- error: bg-red-600
```

---

## Paso 8: TDD - Toast Notifications

### 8.1 Test Primero (RED)

```
Crea el test para Toast. El componente NO existe.

Ubicación: src/shared/components/Toast.test.tsx

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toast } from './Toast'

describe('Toast', () => {
  it('renders message with aria-live for accessibility', () => {
    render(<Toast message="Success!" type="success" onClose={vi.fn()} />)
    expect(screen.getByRole('alert')).toHaveTextContent('Success!')
  })

  it('renders success variant with green background', () => {
    render(<Toast message="Success!" type="success" onClose={vi.fn()} />)
    expect(screen.getByRole('alert')).toHaveClass('bg-green-600')
  })

  it('renders error variant with red background', () => {
    render(<Toast message="Error!" type="error" onClose={vi.fn()} />)
    expect(screen.getByRole('alert')).toHaveClass('bg-red-600')
  })

  it('calls onClose when close button clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<Toast message="Test" type="info" onClose={onClose} />)
    await user.click(screen.getByRole('button', { name: /close/i }))
    expect(onClose).toHaveBeenCalled()
  })

  it('auto-dismisses after 3 seconds', async () => {
    vi.useFakeTimers()
    const onClose = vi.fn()
    render(<Toast message="Test" type="info" onClose={onClose} />)
    
    vi.advanceTimersByTime(3000)
    expect(onClose).toHaveBeenCalled()
    
    vi.useRealTimers()
  })
})
```

**Ejecutar (RED)**:
```bash
pnpm test Toast
```

### 8.2 Implementar (GREEN)

```
Implementa Toast para pasar los tests.

Ubicación: src/shared/components/Toast.tsx

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info'
  onClose: () => void
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
  }

  return (
    <div
      className={`fixed bottom-4 right-4 ${bgColor[type]} text-white px-4 py-3 rounded-lg shadow-lg`}
      role="alert"
      aria-live="polite"
    >
      {message}
      <button onClick={onClose} className="ml-4" aria-label="Close">×</button>
    </div>
  )
}
```

**Ejecutar (GREEN)**:
```bash
pnpm test Toast
```

Usar para mostrar "Added to cart!" cuando se agrega producto.

---

## Paso 9: aria-live para Updates Dinámicos

```
Agrega aria-live regions para anunciar cambios a screen readers.

En CartSummary o ShoppingCart:
<div aria-live="polite" aria-atomic="true" className="sr-only">
  Cart updated: {itemCount} items, total {formatPrice(total)}
</div>

Agregar clase sr-only para ocultar visualmente:
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

IMPORTANTE - Evitar errores jsx-a11y con componentes custom:
Si usas PasswordInput dentro de LoginDemo, NO uses <label> porque
PasswordInput ya tiene aria-label interno. Usar <span> en su lugar:

❌ Incorrecto (causa error jsx-a11y/label-has-associated-control):
<label>Password</label>
<PasswordInput ... />

✅ Correcto:
<span className="block text-sm font-medium">Password</span>
<PasswordInput ... />
```

---

## Paso 10: Verificar Accesibilidad

```bash
# Con Lighthouse en Chrome DevTools
# Tab: Lighthouse → Accessibility audit

# O con axe DevTools extension
```

Objetivo: Score 90+

---

## Paso 11: Verificación COMPLETA (OBLIGATORIO)

```bash
pnpm test:run      # Tests unitarios (incluyendo Skeleton y Toast)
pnpm test:e2e      # Tests E2E
pnpm lint          # Sin errores de lint (jsx-a11y)
pnpm typecheck     # Sin errores de tipos
pnpm build         # Build exitoso
```

> ⚠️ Si alguno falla, corregir antes de continuar.

---

## Checkpoint

Al final del video tienes:
- ✅ ARIA labels en todos los botones
- ✅ Focus visible configurado
- ✅ Navegación por teclado funcionando
- ✅ Skeleton con 4 tests (TDD)
- ✅ Toast con 5 tests (TDD)
- ✅ Optimistic UI en Add to Cart
- ✅ aria-live para screen readers
- ✅ Score de accesibilidad 90+
- ✅ Verificación completa pasando
- ✅ **APP ACCESIBLE** ♿
