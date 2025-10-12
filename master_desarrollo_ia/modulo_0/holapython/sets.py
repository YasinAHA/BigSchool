a = {1,2,3,4,5}
b = {4,5,6,7,8}

print(f"Conjunto A: {a}")
print(f"Conjunto B: {b}")
# Unión
union = a | b
print(f"Unión: {union}")
# Intersección
interseccion = a & b
print(f"Intersección: {interseccion}")
# Diferencia
diferencia = a - b
print(f"Diferencia (A - B): {diferencia}")
# Diferencia simétrica
diferencia_simetrica = a ^ b
print(f"Diferencia simétrica: {diferencia_simetrica}")
# Subconjunto
subconjunto = {1, 2}
es_subconjunto = subconjunto <= a
print(f"¿{subconjunto} es subconjunto de A? {es_subconjunto}")
# Superconjunto
superconjunto = {1, 2, 3, 4, 5, 6}
es_superconjunto = superconjunto >= a
print(f"¿{superconjunto} es superconjunto de A? {es_superconjunto}")
# Añadir un elemento
a.add(6)
print(f"Conjunto A después de añadir 6: {a}")
# Eliminar un elemento
a.remove(3)
print(f"Conjunto A después de eliminar 3: {a}")
# Eliminar un elemento sin error si no existe