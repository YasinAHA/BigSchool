contador = 0
while contador < 5:
    print(f"Contador: {contador}")
    contador += 1

for i in range(5):
    print(f"Número: {i}")

for letra in "Python":
    print(f"Letra: {letra}")

for numero in [10, 20, 30]:
    print(f"Número de la lista: {numero}")

# Uso de break y continue
for i in range(10):
    if i == 5:
        print("Se encontró el número 5, saliendo del bucle.")
        break
    if i % 2 == 0:
        continue
    print(f"Número impar: {i}")

print("Bucle terminado.")
# Uso de else con bucles
for i in range(3):
    print(f"Iteración {i}")
else:
    print("El bucle for ha terminado sin interrupciones.") 
# Bucle while con else
contador = 0
while contador < 3:
    print(f"Contador: {contador}")
    contador += 1
else:
    print("El bucle while ha terminado sin interrupciones.")
# Bucle anidado
for i in range(3):
    for j in range(2):
        print(f"i: {i}, j: {j}")
# Uso de la función range con diferentes parámetros
print("Range con un parámetro:")
for i in range(5):
    print(i)

print("Range con dos parámetros:")
for i in range(2, 5):
    print(i)


print("Range con tres parámetros (incluye paso):")
for i in range(0, 10, 2):
    print(i)
    