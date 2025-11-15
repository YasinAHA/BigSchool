# Ejercicio 1: Query por Role

Actúa como un desarrollador que practica **testing user-centric**.

## Tarea
Crear componente **LikeButton** y su integration test.

## Componente
- likes = 0 → botón: "Like (0)"
- click → "Like (1)"
- React + useState  
Archivo: `src/features/likes/LikeButton.tsx`

## Test
- Vitest + Testing Library
- Query: `getByRole('button', { name: /like \(0\)/i })`
- Interacción: `userEvent.click()`
- Expect: "Like (1)"
Archivo: `src/features/likes/LikeButton.test.tsx`

## Validación
```
npm test
```
