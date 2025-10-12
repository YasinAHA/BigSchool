# Asincronía en Python
import asyncio
import time

async def pedir_cafe():
    print("Cafetera: Preparando café...")
    await asyncio.sleep(2)  # Simula el tiempo de preparación del café
    print("Cafetera: Café listo!")
    return "Café"

async def main():
    cafe = await pedir_cafe()
    print(f"Cliente: He recibido {cafe}")
    print("Cliente: Disfrutando del café...")
    await asyncio.sleep(3)  # Simula el tiempo disfrutando del café
    print("Cliente: Terminé el café.")

if __name__ == "__main__":
    start_time = time.time()
    asyncio.run(main())
    end_time = time.time()
    print(f"Tiempo total transcurrido: {end_time - start_time:.2f} segundos")# Este código simula la preparación y consumo de café utilizando asincronía en Python.
# La función `pedir_cafe` es una función asíncrona que simula la preparación del café con un retardo de 2 segundos.
# La función `main` espera a que el café esté listo, lo recibe y luego simula el tiempo que el cliente disfruta del café con otro retardo de 3 segundos.
# El uso de `asyncio.run(main())` permite ejecutar la función principal de manera asíncrona.
# Al final, se mide y muestra el tiempo total transcurrido para completar todas las tareas.