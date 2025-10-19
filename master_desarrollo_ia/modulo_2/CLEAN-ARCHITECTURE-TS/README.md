
# Módulo 2 — Ejemplos y snippets

Este repositorio contiene ejemplos y snippets de código usados para fines educativos. No es un proyecto completo ni necesariamente funcional tal como está; los archivos son pequeños ejemplos para ilustrar conceptos (arquitectura limpia, capas, tests, etc.).

## Qué encontrarás aquí

- Código TypeScript organizando una estructura de ejemplo (dominio, infraestructura, application, tests, etc.).
- Tests unitarios mínimos con Vitest para comprobar piezas concretas (por ejemplo `src/shared/health.ts`).

## Importante — no es un producto listo para producción

Los ejemplos están pensados para aprendizaje. Algunas dependencias, configuraciones o piezas podrían estar simplificadas, incompletas o modificadas para facilitar la enseñanza. No esperes que el proyecto esté listo para desplegar en producción sin adaptación.

Si necesitas usarlo como punto de partida para un proyecto real, revisa con atención:

- `tsconfig.json` (module/resolution, `verbatimModuleSyntax`, `rootDir`, etc.)
- `package.json` y el campo `type` (ESM vs CommonJS)
- scripts y herramientas de build/test

## Cómo ejecutar los tests localmente

En Windows usando cmd.exe (recomendado para evitar políticas de PowerShell que bloquean `npm.ps1`):

```cmd
cd c:\Users\sdark\Desktop\BigSchool\master_desarrollo_ia\modulo_2
npm install
npm test
```

El proyecto usa Vitest como runner de tests. Si prefieres PowerShell, asegúrate de permitir la ejecución de scripts o ejecuta desde cmd.

## Contribuciones y cambios

Si vas a extender este repositorio para un proyecto real, te recomiendo:

- Convertir la estructura a una configuración de build estable (especificar `rootDir`, `outDir`, y ajustar `module` si necesitas compatibilidad con CommonJS).
- Añadir un CI que ejecute tests y compruebe la compilación TypeScript.

---

Si quieres que adapte este repo para que sea un proyecto funcional (configurar build, CI, empaquetado), dime qué objetivo tienes y lo preparo.

