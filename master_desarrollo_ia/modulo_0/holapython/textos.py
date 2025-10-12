#import holapython.analizador.utilidades as utilidades
from analizador import utilidades
# Contar palabras en un texto

mi_frase = "Hola, ¿cómo estás hoy?"
numero_palabras = utilidades.contar_palabras(mi_frase)
print(f"Número de palabras: {numero_palabras}")

# Convertir a mayúsculas
frase_mayusculas = utilidades.convertir_a_mayusculas(mi_frase)
print(f"Frase en mayúsculas: {frase_mayusculas}")