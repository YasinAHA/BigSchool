# Microservicio de Pedidos
- **Dominio**: Order, Price, SKU, Quantity, eventos en dominio.
- **Aplication**: casos de uso CreateOrder, AddItemToOrder, puertos y DTOs.
- **Infra**: repositorio InMemory, pricing estático, event bus no-op.
- **HTTP**: endpoints minimos con Fastify.
- **Composición**: `container.ts` como composition root.
- **Tests**: dominio + aceptación de casos de uso.

### Comportamiento
- `POST /orders` crea un pedido
- `POST /orders/:orderId/items` agrega una línea (SKU + qty) con precio actual,
- Devuelve el total del pedido.

### Estructura de Carpetas

 