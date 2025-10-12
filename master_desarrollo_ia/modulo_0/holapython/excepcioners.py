edad_str = input("Introduce tu edad: ")
try:
    edad = int(edad_str)
    if edad < 0:
        raise ValueError("La edad no puede ser negativa.")
    print(f"Tienes {edad} años.")
except ValueError as e:
    print(f"Error: {e}. Por favor, introduce un número válido.")
except Exception as e:
    print(f"Ocurrió un error inesperado: {e}")
finally:
    print("Gracias por usar el programa de gestión de edades.")
# Puedes probar diferentes entradas para ver cómo maneja las excepciones
# entradas como "25", "-5", "abc", etc.
# El bloque finally siempre se ejecuta, independientemente de si hubo una excepción o no.
# Puedes probar diferentes entradas para ver cómo maneja las excepciones
# entradas como "25", "-5", "abc", etc.
# El bloque finally siempre se ejecuta, independientemente de si hubo una excepción o no.
