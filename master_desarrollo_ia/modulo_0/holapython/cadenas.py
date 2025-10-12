rol = "desarrollador"
print(rol)
print(type(rol))
empresa = "BigSchool"

# Forma antigua de formatear cadenas
mensaje_antiguo = "Hola, " + rol + " bienvenido a " + empresa + "."
print(mensaje_antiguo)

mensaje_moderno = f"Hola, {rol} bienvenido a {empresa}."
print(mensaje_moderno)

# Podemos incluso ejecutar codigo dentro de las llaves
mensaje_calculo = f"El resultado de 5 + 3 es {5 + 3}."
print(mensaje_calculo)

# Podemos usar triples comillas para cadenas multilínea
mensaje_multilinea = f"""Hola, {rol}!
Bienvenido a {empresa}.
Hoy es un gran día para aprender Python."""
print(mensaje_multilinea)

# Podemos usar comillas simples dentro de comillas dobles y viceversa
mensaje_comillas = 'Ella dijo: "Python es genial".'
print(mensaje_comillas)