# Ejercicio 2: GREEN - Fake It

Actúa como un desarrollador usando el patrón **"Fake It 'Til You Make It"**.

## CONTEXTO
En el paso **GREEN** de TDD, escribes el **código mínimo necesario** para hacer pasar el test.  
"Fake It" permite usar valores **hardcoded** sin lógica real todavía.

Tercera ley de TDD:  
> *"No escribas más código del necesario para pasar el test"*.

---

## TAREA
Implementa `calculateTax` usando el patrón **Fake It**.

### 🔧 REQUIREMENTS
- Función: `calculateTax(amount: number, taxRate: number): number`
- Implementación permitida:
  ```ts
  return 10
  ```
- Objetivo: pasar el test del Ejercicio 1.
- NO implementar aún la fórmula real (`amount * taxRate / 100`).

---

## ❗ IMPORTANTE — PASO GREEN
- El código "malo" es **intencional**.
- Hardcoded es correcto en esta fase.
- El siguiente ejercicio obligará a lógica real.

---

## 📁 ARCHIVOS
- `src/shared/utils/calculateTax.ts` (implementación fake)

---

## ✅ VALIDACIÓN
Ejecuta:

```
pnpm test
```

El test debe PASAR. ✔️

---
