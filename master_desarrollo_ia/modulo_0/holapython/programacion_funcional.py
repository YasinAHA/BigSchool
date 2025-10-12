# Programación Funcional en Python con lambda y list comprehensions

# Función lambda para sumar dos números
suma = lambda x, y: x + y
print(suma(5, 3))

# List comprehension para obtener los cuadrados de los números del 1 al 10
cuadrados = [x**2 for x in range(1, 11)]
print(cuadrados)
# Filtrar números pares de una lista usando list comprehension
numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
pares = [x for x in numeros if x % 2 == 0]
print(pares)
# Usar map para convertir una lista de temperaturas en Celsius a Fahrenheit
celsius = [0, 10, 20, 30, 40]
fahrenheit = list(map(lambda x: (x * 9/5) + 32, celsius))
print(fahrenheit)
# Usar filter para obtener solo los números mayores a 5 de una lista
mayores_a_cinco = list(filter(lambda x: x > 5, numeros))
print(mayores_a_cinco)