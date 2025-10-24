# Event-driven example (AMQP) — Node + TypeScript

Este repositorio contiene un ejemplo pequeño y didáctico de arquitectura basada en eventos usando RabbitMQ (AMQP) con Node.js y TypeScript.

Descripción rápida
- `src/publisher.ts`: publicador sencillo que envía un evento `order.created`.
- `src/consumer.ts`: consumidor que recibe mensajes de la cola `order.created` y los procesa.

Objetivo
Mostrar de forma minimalista cómo separar responsabilidades mediante eventos: productores (publishers) y consumidores (subscribers).

Requisitos
- Node.js (>= 16)
- RabbitMQ corriendo localmente (o la URL en la variable `AMQP_URL`).

Instalación

1. Instala dependencias:

```bash
npm install
```

2. (Opcional) instalación de dependencias de desarrollo para ejecutar con TypeScript sin compilar:

```bash
npm install --save-dev
```

Comandos útiles

- Desarrollo (ejecuta directamente con `ts-node`):

```bash
npx ts-node src/publisher.ts      # publicar un mensaje de ejemplo
npx ts-node src/consumer.ts      # levantar el consumidor
```

- Scripts definidos en `package.json`:

```bash
npm run dev:publisher    # ts-node publisher
npm run dev:consumer     # ts-node consumer
npm run build            # transpila a JS en /dist
npm run start:publisher  # ejecuta dist/publisher.js
npm run start:consumer   # ejecuta dist/consumer.js
```

Mensaje (ejemplo)

El evento usado aquí es `OrderCreatedEvent` con la forma:

```json
{
  "orderId": "string",
  "userId": "string",
  "total": 100
}
```

Buenas prácticas (para seguir aprendiendo)
- Usar colas durables y mensajes persistentes en producción.
- Manejar reconexiones y retries en el consumidor.
- Separar contratos (JSON schemas / protobuf) y versionarlos.
- Añadir pruebas unitarias y E2E con un broker en memoria o contenedores.

---
Si quieres, puedo: (a) añadir un `docker-compose.yml` con RabbitMQ para ejecutar localmente, (b) añadir tipos y pruebas de ejemplo, o (c) integrar reconexión automática y backoff en el consumidor.

Docker Compose — levantar RabbitMQ localmente

Para que el ejemplo sea completamente reproducible, añadí un `docker-compose.yml` que arranca RabbitMQ con la interfaz de management.

Arrancar RabbitMQ:

```bash
docker compose up -d
```

Parar y borrar los contenedores:

```bash
docker compose down
```

Accede a la UI de administración en: http://localhost:15672 (usuario/contraseña: `guest` / `guest`)

Una vez levantado RabbitMQ, ejecuta en otra terminal:

```bash
npm run dev:consumer    # o npm run start:consumer si compilaste
npm run dev:publisher   # para enviar un evento de ejemplo
```

Esto permite probar el flujo publisher -> queue -> consumer sin instalar RabbitMQ localmente.
