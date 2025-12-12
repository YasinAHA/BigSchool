# Comandos cURL para probar la API de Facturas

## Variables de entorno
```bash
# Puerto por defecto (ajusta si usas otro)
export API_URL="http://localhost:3000"
```

## 1. Crear una nueva factura (borrador)

```bash
curl -X POST $API_URL/api/facturas \
  -H "Content-Type: application/json" \
  -d '{
    "cifCliente": "B12345678",
    "denominacionSocial": "Empresa Ejemplo S.L.",
    "direccionFiscal": "Calle Mayor 123, 28001 Madrid",
    "importeBase": 1000.00,
    "iva": 210.00
  }'
```

**Respuesta esperada:** Status 201, factura creada en estado `borrador` con `numero: null`

## 2. Crear otra factura

```bash
curl -X POST $API_URL/api/facturas \
  -H "Content-Type: application/json" \
  -d '{
    "cifCliente": "B87654321",
    "denominacionSocial": "Tech Solutions S.A.",
    "direccionFiscal": "Avenida Tecnología 45, 08001 Barcelona",
    "importeBase": 500.00,
    "iva": 105.00
  }'
```

## 3. Obtener todas las facturas

```bash
curl -X GET $API_URL/api/facturas
```

**Respuesta esperada:** Lista con todas las facturas creadas

## 4. Filtrar facturas por estado (borrador)

```bash
curl -X GET "$API_URL/api/facturas?estado=borrador"
```

## 5. Filtrar facturas por estado (definitivo)

```bash
curl -X GET "$API_URL/api/facturas?estado=definitivo"
```

## 6. Filtrar facturas por CIF del cliente

```bash
curl -X GET "$API_URL/api/facturas?cifCliente=B12345678"
```

## 7. Filtrar por estado Y CIF

```bash
curl -X GET "$API_URL/api/facturas?estado=borrador&cifCliente=B12345678"
```

## 8. Obtener una factura específica por ID

```bash
# Primero guarda el ID de una factura creada
export FACTURA_ID="<ID_DE_TU_FACTURA>"

curl -X GET $API_URL/api/facturas/$FACTURA_ID
```

**Nota:** Reemplaza `<ID_DE_TU_FACTURA>` con un ID real obtenido al crear una factura

## 9. Cambiar estado de factura a definitivo

```bash
# Usando el ID guardado anteriormente
curl -X PATCH $API_URL/api/facturas/$FACTURA_ID/estado \
  -H "Content-Type: application/json" \
  -d '{
    "estado": "definitivo"
  }'
```

**Respuesta esperada:** La factura ahora tiene `estado: "definitivo"`, un `numero` asignado (formato `BT###`) y `fechaDefinitivo` con timestamp

## 10. Eliminar una factura en estado borrador

```bash
# Solo funciona si la factura está en estado borrador
curl -X DELETE $API_URL/api/facturas/$FACTURA_ID
```

**Respuesta esperada:** Status 204 (sin contenido) si se elimina correctamente

## 11. Intentar eliminar una factura definitiva (debe fallar)

```bash
# Primero crea y convierte a definitivo
curl -X POST $API_URL/api/facturas \
  -H "Content-Type: application/json" \
  -d '{
    "cifCliente": "B99999999",
    "denominacionSocial": "Empresa Definitiva",
    "direccionFiscal": "Calle Final 1",
    "importeBase": 300.00,
    "iva": 63.00
  }' | jq -r '.id' > /tmp/factura_id.txt

export FACTURA_DEF_ID=$(cat /tmp/factura_id.txt)

# Cambiar a definitivo
curl -X PATCH $API_URL/api/facturas/$FACTURA_DEF_ID/estado \
  -H "Content-Type: application/json" \
  -d '{"estado": "definitivo"}'

# Intentar eliminar (debe fallar con 400)
curl -X DELETE $API_URL/api/facturas/$FACTURA_DEF_ID
```

**Respuesta esperada:** Status 400 con mensaje de error indicando que no se puede eliminar

## 12. Crear factura sin campos requeridos (debe fallar)

```bash
curl -X POST $API_URL/api/facturas \
  -H "Content-Type: application/json" \
  -d '{
    "cifCliente": "B12345678"
  }'
```

**Respuesta esperada:** Status 400 con error de campos requeridos

## 13. Obtener factura inexistente (debe fallar)

```bash
curl -X GET $API_URL/api/facturas/550e8400-e29b-41d4-a716-446655440000
```

**Respuesta esperada:** Status 404

---

## Flujo completo de prueba

```bash
# 1. Crear factura
RESPONSE=$(curl -s -X POST $API_URL/api/facturas \
  -H "Content-Type: application/json" \
  -d '{
    "cifCliente": "B12345678",
    "denominacionSocial": "Mi Empresa S.L.",
    "direccionFiscal": "Calle Test 123",
    "importeBase": 1000.00,
    "iva": 210.00
  }')

echo "Factura creada:"
echo $RESPONSE | jq '.'

# 2. Extraer ID
FACTURA_ID=$(echo $RESPONSE | jq -r '.id')
echo "ID: $FACTURA_ID"

# 3. Consultar la factura
echo -e "\nConsultando factura..."
curl -s -X GET $API_URL/api/facturas/$FACTURA_ID | jq '.'

# 4. Cambiar a definitivo
echo -e "\nCambiando a definitivo..."
curl -s -X PATCH $API_URL/api/facturas/$FACTURA_ID/estado \
  -H "Content-Type: application/json" \
  -d '{"estado": "definitivo"}' | jq '.'

# 5. Listar todas las facturas
echo -e "\nListando todas las facturas..."
curl -s -X GET $API_URL/api/facturas | jq '.'
```

**Nota:** Los comandos con `jq` requieren tener instalado `jq` para formatear el JSON. Si no lo tienes, elimina el `| jq '.'`
