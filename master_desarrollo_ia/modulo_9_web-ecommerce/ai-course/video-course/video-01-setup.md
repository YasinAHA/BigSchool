# Video 1: Setup + Primer Componente (15 min)

## Resultado Final
Proyecto React funcionando con ProductCard testeado.

---

## Paso 1: Crear Proyecto

```bash
pnpm create vite@latest simple-product-shop --template react-ts
cd simple-product-shop
pnpm install
pnpm install -D tailwindcss @tailwindcss/vite
```

---

## Paso 2: Configurar Tailwind

```
Configura Tailwind CSS v4 en el proyecto Vite.

Archivos a modificar:
1. vite.config.ts - agregar plugin de tailwind
2. src/index.css - agregar @import "tailwindcss"

Dame los archivos completos.
```

---

## Paso 3: Configurar Testing

```bash
pnpm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitest/coverage-v8
```

```
Configura Vitest para React con Testing Library.

Crear:
1. vitest.config.ts - environment jsdom, setupFiles
2. src/test/setup.ts - import jest-dom
3. Agregar scripts en package.json: "test", "test:run", "test:coverage"

Dame los archivos completos.
```

**Verificar**:
```bash
pnpm test
```

---

## Paso 3.1: Configurar tsconfig para Build (IMPORTANTE)

```
IMPORTANTE: Excluir archivos de test del build de producción.

Actualizar tsconfig.app.json:

{
  "compilerOptions": {
    // ... opciones existentes
  },
  "include": ["src"],
  "exclude": ["src/**/*.test.ts", "src/**/*.test.tsx", "src/test/**"]
}

Esto evita errores de build cuando TSC intenta compilar tests que usan globals de Vitest.
```

---

## Paso 4: Estructura de Carpetas

```
Crea la estructura de carpetas para el proyecto:

src/
  features/
    product-catalog/
      components/
    shopping-cart/
      components/
  shared/
    types/
    utils/
    constants/
  context/
  test/
    setup.ts

Solo crea las carpetas con archivos .gitkeep o index.ts vacíos.
```

---

## Paso 5: TDD - ProductCard

### 5.1 Test Primero (RED)

```
Crea el test para ProductCard. El componente NO existe aún.

Ubicación: src/features/product-catalog/components/ProductCard.test.tsx

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProductCard } from './ProductCard'

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    name: 'Wireless Headphones',
    price: 79.99,
    image: 'https://picsum.photos/200',
  }
  const mockOnAdd = vi.fn()

  beforeEach(() => vi.clearAllMocks())

  it('renders product name', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAdd} />)
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
  })

  it('renders formatted price', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAdd} />)
    expect(screen.getByText('$79.99')).toBeInTheDocument()
  })

  it('calls onAddToCart when button clicked', async () => {
    const user = userEvent.setup()
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAdd} />)
    await user.click(screen.getByRole('button', { name: /add to cart/i }))
    expect(mockOnAdd).toHaveBeenCalledWith(mockProduct)
  })
})

Dame solo el archivo de test.
```

**Ejecutar (debe fallar)**:
```bash
pnpm test ProductCard
```

### 5.2 Implementar (GREEN)

```
Tengo este test fallando para ProductCard.

[Pegar el test]

Implementa ProductCard.tsx que pase todos los tests.

Ubicación: src/features/product-catalog/components/ProductCard.tsx

Requisitos:
- Props: product (con id, name, price, image), onAddToCart callback
- Mostrar imagen, nombre, precio formateado ($XX.XX)
- Botón "Add to Cart" que llama onAddToCart(product)
- Estilos con Tailwind (card con sombra, hover en botón)

Solo el código mínimo para pasar los tests.
```

**Ejecutar (debe pasar)**:
```bash
pnpm test ProductCard
```

---

## Paso 6: Ver en Browser

```
Modifica App.tsx para mostrar un ProductCard de prueba.

Importa ProductCard y renderiza uno con datos hardcodeados.
El onAddToCart puede ser un console.log por ahora.
```

**Verificar**:
```bash
pnpm dev
# Abrir http://localhost:5173
```

---

## Paso 7: Verificación Final

```bash
# Ejecutar TODOS estos comandos - todos deben pasar
pnpm test:run      # Tests unitarios
pnpm lint          # Sin errores de lint (si ya está configurado)
pnpm build         # Build exitoso (verifica que tsconfig excluye tests)
```

> ⚠️ **IMPORTANTE**: A partir de este video, SIEMPRE verificar con estos comandos antes de dar por completado cualquier feature.

---

## Checkpoint

Al final del video tienes:
- ✅ Proyecto Vite + React + TypeScript
- ✅ Tailwind CSS funcionando
- ✅ Vitest + Testing Library configurado
- ✅ tsconfig.app.json excluyendo archivos de test
- ✅ Estructura de carpetas lista
- ✅ ProductCard con tests pasando
- ✅ App mostrando el componente
- ✅ Build exitoso
