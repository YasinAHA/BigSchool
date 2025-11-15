# Ejercicio 3: Triangulation

Actúa como un desarrollador usando el patrón **Triangulation**.

## CONTEXTO
Triangulation consiste en usar **múltiples tests** para obligar a la implementación real.  
Un solo test permite usar *Fake It*.  
Dos o más tests distintos fuerzan a generalizar correctamente.

---

## TAREA
Agrega un **segundo test** y refactoriza a la implementación real.

### 🔧 TEST SPECIFICATIONS
- Nuevo caso: `calculateTax(200, 15)` debe retornar **30**
- Mantén el anterior: `calculateTax(100, 10)` → **10**
- Ambos dentro del mismo `describe`.

---

## 🧪 CICLO TDD
1. 🔴 **RED** — Agregar segundo test → **FALLA** (retorna siempre 10)
2. 🟢 **GREEN** — Implementar fórmula real
3. Fórmula correcta:
   ```ts
   amount * (taxRate / 100)
   ```
4. ✅ Ambos tests deben PASAR

---

## ❗ IMPORTANTE — TRIANGULATION
- Hardcoded ya NO sirve con 2 tests distintos.
- Los tests fuerzan la implementación correcta.
- Más confiable que “adivinar” la lógica.

---

## 📁 ARCHIVOS
- `src/shared/utils/calculateTax.test.ts` (agregar segundo test)
- `src/shared/utils/calculateTax.ts` (refactor con lógica real)

---

## ✅ VALIDACIÓN
Ejecuta:

```
pnpm test
```

Ambos tests deben PASAR. ✔️

---
