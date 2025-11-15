# Reglas de trabajo para las tareas TDD

Este proyecto está organizado en **tareas** dentro de la carpeta `tasks/`.  
Antes de hacer nada, **lee completamente este archivo (`rules.md`)** y respeta siempre estas reglas.

---

## 1. Orden de lectura y ejecución

1. **Primero** lee `rules.md` (este archivo).
2. **Después**, lee las tareas de la carpeta `tasks/` en este orden:
   - `Ejercicio 1: RED - Test que Falla`
   - `Ejercicio 2: GREEN - Fake It`
   - `Ejercicio 3: Triangulation`
3. Trabaja **siempre en orden**: no avances al Ejercicio 2 sin terminar el 1, ni al 3 sin terminar el 2.

---

## 2. Paso 0 – Estructura inicial del proyecto

Antes de empezar con el **Ejercicio 1**, debes:

1. Crear o revisar la **estructura inicial del proyecto**, asegurando al menos:
   - Un proyecto TypeScript/Node o frontend con soporte para tests.
   - Framework de tests: **Vitest** correctamente configurado.
   - Scripts configurados para correr tests, por ejemplo:
     {
       "scripts": {
         "test": "vitest"
       }
     }
   - Carpeta de código fuente y tests, por ejemplo:
     - `src/shared/utils/`
     - `src/shared/utils/calculateTax.ts`
     - `src/shared/utils/calculateTax.test.ts`
2. Verificar que el comando de tests funciona:
   pnpm test
3. **No implementar aún la lógica de producción** de `calculateTax` antes del Ejercicio 1 (fase RED).

---

## 3. Flujo de trabajo por cada ejercicio

Para **cada ejercicio** de la carpeta `tasks/`, sigue siempre este patrón:

### 3.1. Leer la tarea

1. Leer el enunciado completo del ejercicio en `tasks/`.
2. Entender en qué fase del ciclo TDD estás:
   - Ejercicio 1 → **RED** (test que falla)
   - Ejercicio 2 → **GREEN** (Fake It)
   - Ejercicio 3 → **Triangulation** (más tests y refactor a lógica real)

### 3.2. Aplicar TDD estricto

#### Fase RED (Ejercicio 1)

- Escribir **solo el test** definido en la tarea.
- No implementar la función `calculateTax` todavía.
- Ejecutar:
  pnpm test
- Confirmar que el test **falla** con el error esperado.

#### Fase GREEN (Ejercicio 2)

- Implementar el **código mínimo** para que el test pase.
- Se permite implementar `calculateTax` con valores **hardcoded** (Fake It).
- Ejecutar:
  pnpm test
- Confirmar que los tests **pasan**.

#### Fase TRIANGULATION (Ejercicio 3)

- Añadir un **segundo test** con valores distintos.
- Verificar que con la implementación hardcoded actual, el nuevo test **falla**.
- Refactorizar `calculateTax` para usar la lógica real:
  amount * (taxRate / 100)
- Ejecutar:
  pnpm test
- Confirmar que **todos** los tests pasan.

---

## 4. Regla de commits por tarea

Por cada ejercicio/tarea:

1. **Completa la fase correspondiente** (RED, GREEN o TRIANGULATION).
2. Asegúrate del estado correcto.
3. **Crea un commit** que explique claramente lo que has hecho.

---

## 5. Validación

Ejecutar:
npm test

---

## 6. Filosofía

- Primero tests, luego código.
- Solo el código necesario para pasar el test.
- Tests múltiples fuerzan lógica correcta.
