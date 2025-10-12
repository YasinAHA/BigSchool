# Código ssin refactorizar de un ejemplo de generar_reporte_usuario
def generar_reporte_usuario(lista_usuarios):
    # Esta función obtiene usuarios, filtra los activos, y formatea un reporte
    reporte = "--- Reporte de Usuarios Activos ---\n"
    activos = 0
    for usuario in lista_usuarios:
        # La lógica de filtrado está mezclada
        if (
            usuario.get("activo")
            and usuario.get("ultimo_login_hace_dias") < 30
        ):
            nombre = usuario.get("nombre")
            edad = usuario.get("edad")
            email = usuario.get("email")
            # La lógica de formateo está mezclada
            reporte += f"Usuario: {nombre}, Edad: {edad}, Email: {email}\n"
            activos += 1
    reporte += f"--- Total de usuarios activos: {activos} ---\n"
    return reporte


# Ejemplo de uso
usuarios = [
    {
        "nombre": "Ana",
        "edad": 28,
        "email": "ana@example .com",
        "activo": True,
        "ultimo_login_hace_dias": 10,
    },
    {
        "nombre": "Luis",
        "edad": 34,
        "email": "luis@example.com",
        "activo": True,
        "ultimo_login_hace_dias": 5,
    },
    {
        "nombre": "Marta",
        "edad": 22,
        "email": "marta@example.com",
        "activo": False,
        "ultimo_login_hace_dias": 40,
    },
]

print(generar_reporte_usuario(usuarios))


# Código refactorizado con funciones separadas
def es_usuario_activo(usuario):
    return usuario.get("activo") and usuario.get("ultimo_login_hace_dias") < 30


def formatear_usuario(usuario):
    return (
        f"Usuario: {usuario.get('nombre')}, "
        f"Edad: {usuario.get('edad')}, "
        f"Email: {usuario.get('email')}"
    )


def generar_reporte_usuario(lista_usuarios):
    reporte = "--- Reporte de Usuarios Activos ---\n"
    for usuario in lista_usuarios:
        if es_usuario_activo(usuario):
            reporte += formatear_usuario(usuario) + "\n"
    total_activos = sum(
        1 for u in lista_usuarios if es_usuario_activo(u)
    )
    reporte += (
        f"--- Total de usuarios activos: {total_activos} ---\n"
    )
    return reporte


# Ejemplo de uso
usuarios = [
    {
        "nombre": "Ana",
        "edad": 28,
        "email": "ana@example .com",
        "activo": True,
        "ultimo_login_hace_dias": 10,
    },
    {
        "nombre": "Luis",
        "edad": 34,
        "email": "luis@example.com",
        "activo": True,
        "ultimo_login_hace_dias": 5,
    },
    {
        "nombre": "Marta",
        "edad": 22,
        "email": "marta@example.com",
        "activo": False,
        "ultimo_login_hace_dias": 40,
    },
]

print(generar_reporte_usuario(usuarios))
# La versión refactorizada es más clara y modular,
# facilitando el mantenimiento y la comprensión del código.
