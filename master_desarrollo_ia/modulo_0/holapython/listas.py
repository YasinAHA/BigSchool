lenguajes = ["Python", "JavaScript", "C++", "Java", "Ruby"]

print(lenguajes)

print(lenguajes[0])  # Primer elemento
print(lenguajes[-1]) # Último elemento
print(lenguajes[1:4]) # Sublista desde el índice 1 hasta el 3
print(lenguajes[:3])  # Primeros tres elementos
print(lenguajes[2:])  # Desde el índice 2 hasta el final
print(lenguajes[::2]) # Elementos en posiciones pares
print(lenguajes[::-1]) # Lista invertida
print(len(lenguajes))  # Longitud de la lista
# Modificar un elemento
lenguajes[1] = "TypeScript"
print(lenguajes)
# Añadir un elemento al final
lenguajes.append("Go")
print(lenguajes)
# Insertar un elemento en una posición específica
lenguajes.insert(2, "Swift")
print(lenguajes)
# Eliminar un elemento por valor
lenguajes.remove("Java")
print(lenguajes)
# Eliminar un elemento por índice
del lenguajes[0]
print(lenguajes)
# Eliminar y obtener el último elemento
ultimo = lenguajes.pop()
print(f"Elemento eliminado: {ultimo}")
print(lenguajes)
# Ordenar la lista
lenguajes.sort()
print(lenguajes)
# Ordenar en orden inverso
lenguajes.sort(reverse=True)
print(lenguajes)
# Ordenar sin modificar la lista original
ordenados = sorted(lenguajes)
print(f"Lista ordenada: {ordenados}")
print(f"Lista original: {lenguajes}")
# Invertir el orden de la lista
lenguajes.reverse()
print(lenguajes)
# Buscar el índice de un elemento
indice = lenguajes.index("C++")
print(f"El índice de C++ es: {indice}")
# Contar cuántas veces aparece un elemento
conteo = lenguajes.count("Python")
print(f"Python aparece {conteo} veces en la lista.")
# Limpiar la lista
lenguajes.clear()
print(lenguajes)
# Crear una lista a partir de otra
nueva_lista = list(lenguajes)
print(nueva_lista)
# Copiar una lista
copia_lista = lenguajes.copy()
print(copia_lista)
# Concatenar listas
otra_lista = ["PHP", "C#"]
combinada = lenguajes + otra_lista
print(combinada)
# Repetir una lista
repetida = lenguajes * 2
print(repetida)
# Verificar si un elemento está en la lista
existe = "Python" in lenguajes
print(f"¿Python está en la lista? {existe}")
# Iterar sobre una lista
for lenguaje in lenguajes:
    print(lenguaje)
# Iterar con índice
for i, lenguaje in enumerate(lenguajes):
    print(f"{i}: {lenguaje}")
# Listas anidadas
matriz = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
print(matriz)
print(matriz[0])      # Primera fila
print(matriz[1][2])   # Elemento en la segunda fila, tercera columna
# Comprensión de listas
cuadrados = [x**2 for x in range(10)]
print(cuadrados)
# Filtrar con comprensión de listas
pares = [x for x in range(20) if x % 2 == 0]
print(pares)
# Mapear con comprensión de listas
incrementados = [x + 1 for x in range(5)]
print(incrementados)
# Uso de funciones con listas
suma = sum(lenguajes) if all(isinstance(x, (int, float)) for x in lenguajes) else "No se puede sumar elementos no numéricos" 
print(suma)
maximo = max(lenguajes) if all(isinstance(x, (int, float)) for x in lenguajes) else "No se puede obtener el máximo de elementos no numéricos"
print(maximo)
minimo = min(lenguajes) if all(isinstance(x, (int, float))  for x in lenguajes) else "No se puede obtener el mínimo de elementos no numéricos"
print(minimo)
promedio = sum(lenguajes) / len(lenguajes) if all(isinstance(x, (int, float)) for x in lenguajes) and len(lenguajes) > 0 else "No se puede calcular el promedio"
print(promedio)
# Convertir una cadena en una lista
cadena = "Python,JavaScript,C++,Java,Ruby"