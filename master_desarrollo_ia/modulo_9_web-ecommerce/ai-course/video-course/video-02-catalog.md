# Video 2: Tipos + Catálogo de Productos (15 min)

## Resultado Final
Catálogo mostrando 6 productos en grid responsive.

---

## Paso 1: Definir Tipos

```
Crea los tipos TypeScript para la aplicación.

Ubicación: src/shared/types/index.ts

Tipos:
- Product: id (number), name (string), price (number), image (string), description (string)
- CartItem: product (Product), quantity (number)

Exporta todos los tipos.
```

---

## Paso 2: Datos de Productos

```
Crea datos mock de 6 productos.

Ubicación: src/shared/data/products.ts

Productos variados:
1. Wireless Headphones - $79.99
2. Smart Watch - $199.99
3. Laptop Stand - $49.99
4. Mechanical Keyboard - $129.99
5. USB-C Hub - $39.99
6. Webcam HD - $89.99

Usa https://picsum.photos/seed/[nombre]/200 para imágenes.
Exporta como `products`.
```

---

## Paso 3: Actualizar ProductCard con Tipos

```
Actualiza ProductCard para usar los tipos definidos.

Ubicación: src/features/product-catalog/components/ProductCard.tsx

Cambios:
- Importar Product con ruta relativa: import { Product } from '../../../shared/types'
- Props: { product: Product, onAddToCart: (product: Product) => void }
- Agregar descripción debajo del nombre (texto truncado)

NOTA: Usamos rutas relativas por ahora. Path aliases (@/) se configuran opcionalmente al final.

Actualiza también el test si es necesario.
```

**Verificar**:
```bash
pnpm test ProductCard
```

---

## Paso 4: TDD - ProductCatalog

### 4.1 Test Primero (RED)

```
Crea el test para ProductCatalog. El componente NO existe.

Ubicación: src/features/product-catalog/ProductCatalog.test.tsx

import { render, screen } from '@testing-library/react'
import { ProductCatalog } from './ProductCatalog'

// Mock de productos para el test (usando ruta relativa)
vi.mock('../../shared/data/products', () => ({
  products: [
    { id: 1, name: 'Product 1', price: 10, image: '/1.jpg', description: 'Desc 1' },
    { id: 2, name: 'Product 2', price: 20, image: '/2.jpg', description: 'Desc 2' },
  ]
}))

describe('ProductCatalog', () => {
  it('renders all products', () => {
    render(<ProductCatalog onAddToCart={vi.fn()} />)
    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.getByText('Product 2')).toBeInTheDocument()
  })

  it('renders catalog title', () => {
    render(<ProductCatalog onAddToCart={vi.fn()} />)
    expect(screen.getByRole('heading', { name: /products/i })).toBeInTheDocument()
  })
})
```

**Ejecutar (debe fallar)**:
```bash
pnpm test ProductCatalog
```

### 4.2 Implementar (GREEN)

```
Tengo este test fallando para ProductCatalog.

[Pegar el test]

Implementa ProductCatalog.tsx que pase todos los tests.

Ubicación: src/features/product-catalog/ProductCatalog.tsx

Requisitos:
- Importa products de shared/data/products
- Importa ProductCard
- Renderiza heading "Products"
- Grid de ProductCard (responsive: 1 col mobile, 2 tablet, 3 desktop)
- Recibe onAddToCart y lo pasa a cada ProductCard

Estilos con Tailwind.
```

**Ejecutar (debe pasar)**:
```bash
pnpm test ProductCatalog
```

---

## Paso 5: Integrar en App

```
Actualiza App.tsx para mostrar ProductCatalog.

Requisitos:
- Header con título "Simple Product Shop"
- ProductCatalog ocupando el contenido principal
- onAddToCart que haga console.log del producto por ahora
- Container con max-width y padding
- Fondo gris claro (bg-gray-100)
```

**Verificar**:
```bash
pnpm dev
```

---

## Paso 6: Configurar Path Aliases (Opcional)

```
Configura path aliases para imports más limpios.

Archivos a modificar:
1. tsconfig.json - paths: { "@/*": ["./src/*"] }
2. vite.config.ts - resolve.alias

Así podemos usar:
import { Product } from '@/shared/types'
import { products } from '@/shared/data/products'
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
- ✅ Tipos TypeScript definidos (Product, CartItem)
- ✅ 6 productos mock con imágenes
- ✅ ProductCatalog con tests pasando
- ✅ Grid responsive funcionando
- ✅ App mostrando el catálogo completo
- ✅ Build exitoso
