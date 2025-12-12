# Invoices API

API para gestionar facturas con soporte para almacenamiento en memoria y PostgreSQL.

## Configuración

### Variables de entorno

Copia `.env.example` a `.env` y ajusta las variables:

```bash
cp .env.example .env
```

### Base de datos PostgreSQL

#### Opción 1: Docker Compose (Recomendado)

```bash
# Levantar PostgreSQL
docker-compose up -d

# Verificar que esté funcionando
docker-compose ps

# Ejecutar migraciones
npm run db:migrate

# Iniciar servidor con PostgreSQL
npm run dev
```

#### Opción 2: PostgreSQL local

Instala PostgreSQL localmente y crea la base de datos:

```sql
CREATE DATABASE invoices_api;
```

## Scripts disponibles

### Desarrollo
```bash
npm run dev          # Servidor en modo desarrollo
npm run build        # Compilar TypeScript
npm run start        # Servidor en producción
```

### Base de datos
```bash
npm run db:migrate   # Ejecutar migraciones
npm run db:reset     # Limpiar base de datos
```

### Tests
```bash
npm test            # Ejecutar tests
npm run test:ui     # Interfaz de tests
npm run test:coverage # Coverage de tests
```

### Docker
```bash
docker-compose up -d     # Levantar PostgreSQL
docker-compose down      # Parar PostgreSQL
docker-compose logs postgres  # Ver logs
```

## Repositorios

La API soporta dos tipos de almacenamiento:

- **In-Memory**: `USE_POSTGRESQL=false` (por defecto)
- **PostgreSQL**: `USE_POSTGRESQL=true`

## Endpoints

### Autenticación
- `GET /api/test/protected` - Endpoint protegido (token: `test-token-123`)

### Facturas
- `POST /api/facturas` - Crear factura
- `GET /api/facturas` - Listar facturas (filtros: estado, cifCliente)
- `GET /api/facturas/:id` - Obtener factura por ID
- `PATCH /api/facturas/:id/estado` - Actualizar estado
- `DELETE /api/facturas/:id` - Eliminar factura