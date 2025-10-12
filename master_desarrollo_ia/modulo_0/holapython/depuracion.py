# Ejemplo de calcular precion con descuento pero con errores
def calcular_precio_con_descuento(precio, descuento):
    # Error: falta verificar que el descuento no sea mayor que el precio
    precio_final = precio - (precio * descuento / 100)
    return precio_final


# Ejemplo de uso con error
precio = 100
descuento = 150  # Descuento inválido
precio_con_descuento = calcular_precio_con_descuento(precio, descuento)
print(f"El precio con descuento es: {precio_con_descuento}")


# Corrección del código
def calcular_precio_con_descuento_corregido(precio, descuento):
    if descuento < 0 or descuento > 100:
        raise ValueError("El descuento debe estar entre 0 y 100")
    precio_final = precio - (precio * descuento / 100)
    return precio_final


# Ejemplo de uso
try:
    precio = 100
    descuento = 20
    precio_con_descuento = calcular_precio_con_descuento_corregido(
        precio, descuento
    )
    print(f"El precio con descuento es: {precio_con_descuento}")
except ValueError as e:
    print(e)
