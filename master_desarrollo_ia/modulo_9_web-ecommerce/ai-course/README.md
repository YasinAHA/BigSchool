# 🛒 Curso de IA - Desarrollo de Calidad con React

> Proyecto educativo que demuestra Testing, Calidad, Seguridad y Desarrollo Asistido por IA a través de 29 lecciones progresivas

Una aplicación moderna de carrito de compras construida con React 19, TypeScript y Vite, demostrando prácticas profesionales de desarrollo.

## 📚 ¿Qué es este Proyecto?

Este es un **proyecto educativo** que enseña prácticas profesionales de calidad de software a través de 29 lecciones progresivas. El proyecto es una aplicación moderna de carrito de compras lista para producción que demuestra:

- ✅ **167 tests unitarios/integración** (enfoque TDD)
- ✅ **21 tests E2E** en 3 navegadores
- ✅ **100/80/0 cobertura estratégica** de tests
- ✅ **Mejores prácticas de seguridad** (OWASP Top 10)
- ✅ **Observabilidad** con Sentry
- ✅ **Quality gates** (Husky hooks)
- ✅ **Accesibilidad** (WCAG 2.1 AA)
- ✅ **UX Excellence** (Nielsen's 10 heuristics)

---

## 🎓 ¿Cómo Funciona el Curso?

### Metodología: Aprendizaje Progresivo con Ejercicios Prácticos

Cada lección del curso incluye:

1. **Slides explicativas** con conceptos teóricos
2. **Ejercicios prácticos** con prompts específicos para implementar con IA
3. **Código de referencia** que muestra la solución esperada

### Workflow del Estudiante

```bash
# 1. Navegar al directorio del curso
cd ai-course

# 2. Instalar dependencias
pnpm install

# 3. Ver las slides de la lección (ejemplo: Lección 10)
./present.sh 10

# 4. Ejecutar la app
pnpm run dev

# 5. Implementar los ejercicios de la lección usando IA

# 6. Ejecutar los tests para verificar tu implementación
pnpm test
```

### Cómo Ver las Slides

Cada lección tiene slides explicativas en la carpeta `docs/slides/`. Para verlas:

```bash
# Ver slides de una lección específica (ejemplo: Lección 15)
./present.sh 15

# Las slides se abrirán en tu navegador en modo presentación
# Navega con las flechas del teclado ← →
```

**Controles de las Slides:**

- `→` o `Espacio`: Siguiente slide
- `←`: Slide anterior
- `Esc`: Vista general (overview)
- `F`: Pantalla completa
- `?`: Ver todos los controles

---

## 📋 Índice de Lecciones (29 Total)

### 🧪 Testing (Lecciones 1-4)

| #   | Lección             | Qué Aprenderás                                   |
| --- | ------------------- | ------------------------------------------------ |
| 1   | Testing Setup       | Vitest + Testing Library + Coverage              |
| 2   | TDD Implementation  | Red-Green-Refactor, AAA Pattern                  |
| 3   | Integration Testing | Tests de componentes, userEvent                  |
| 4   | E2E Testing         | Playwright, Page Object Model, Visual Regression |

**Al completar la Lección 4 habrás implementado:**

- ✅ 30 tests pasando (20 unit + 10 E2E)
- ✅ Configuración completa de Playwright
- ✅ 3 navegadores configurados (Chromium, Firefox, WebKit)
- ✅ Tests de regresión visual con screenshots

---

### 🔧 Refactoring (Lecciones 5-7)

| #   | Lección              | Qué Aprenderás                                         |
| --- | -------------------- | ------------------------------------------------------ |
| 5   | Code Smells          | SonarJS, detección de code smells                      |
| 6   | Safe Refactoring     | Extracción de constantes, eliminación de código muerto |
| 7   | Advanced Refactoring | Strategy Pattern, Factory Pattern                      |

**Al completar la Lección 7 habrás implementado:**

- ✅ 71 tests pasando
- ✅ Business rules centralizadas
- ✅ Strategy Pattern para descuentos
- ✅ Código refactorizado sin code smells

---

### 📊 Metrics & Debt (Lecciones 8-10)

| #   | Lección            | Qué Aprenderás                    |
| --- | ------------------ | --------------------------------- |
| 8   | Technical Debt     | Documentación de deuda técnica    |
| 9   | Essential Metrics  | GitHub Actions, métricas de salud |
| 10  | Strategic Coverage | Sistema 100/80/0, thresholds      |

**Al completar la Lección 10 habrás implementado:**

- ✅ Sistema de cobertura estratégica 100/80/0
- ✅ CORE tier: 100% coverage obligatorio
- ✅ IMPORTANT tier: 80%+ coverage
- ✅ INFRASTRUCTURE tier: 0% estratégico

---

### 🚪 Quality Gates (Lecciones 11-12)

| #   | Lección               | Qué Aprenderás                    |
| --- | --------------------- | --------------------------------- |
| 11  | Playwright Visibility | Reporters HTML/JSON, trace viewer |
| 12  | Husky Quality Gates   | Pre-commit + Pre-push hooks       |

**Al completar la Lección 12 habrás implementado:**

- ✅ Pre-commit: lint + test + build
- ✅ Pre-push: coverage + E2E tests
- ✅ No se puede commitear código roto
- ✅ No se puede pushear sin 100% coverage en CORE

---

### 🔭 Observability (Lecciones 13-17)

| #   | Lección                | Qué Aprenderás                |
| --- | ---------------------- | ----------------------------- |
| 13  | Observability Strategy | Framework 4 Preguntas, ROI    |
| 14  | Sentry Implementation  | Tunnel proxy, Browser tracing |
| 15  | Sentry Errors          | ErrorBoundary, Breadcrumbs    |
| 16  | Sentry Performance     | Core Web Vitals, Custom spans |
| 17  | Sentry Alerts          | Configuración de dashboards   |

**Al completar la Lección 16 habrás implementado:**

- ✅ Integración completa de Sentry
- ✅ Error tracking con context
- ✅ Performance monitoring
- ✅ Session replay configurado

---

### 🔒 Security (Lecciones 18-21)

| #   | Lección               | Qué Aprenderás                        |
| --- | --------------------- | ------------------------------------- |
| 18  | Environment & Secrets | Zod validation, .env seguro           |
| 19  | Authentication        | JWT simulation, role-based access     |
| 20  | Web Security          | XSS prevention con DOMPurify          |
| 21  | OWASP Top 10          | Password validator, SecurityChecklist |

**Al completar la Lección 21 habrás implementado:**

- ✅ 142 tests pasando
- ✅ Validador de passwords (20 tests)
- ✅ OWASP Top 10 2021 implementado
- ✅ SecurityChecklist component

---

### 📖 Documentation (Lecciones 22-24)

| #   | Lección           | Qué Aprenderás                 |
| --- | ----------------- | ------------------------------ |
| 22  | Docs as Code      | JSDoc, README comprehensivo    |
| 23  | APIs & Components | Storybook, OpenAPI 3.0.3       |
| 24  | ADR               | Architectural Decision Records |

**Al completar la Lección 24 habrás implementado:**

- ✅ 4 ADRs documentados
- ✅ Storybook 9.1.13 funcionando
- ✅ OpenAPI spec para 8 endpoints
- ✅ Component stories con a11y tests

---

### 💼 Communication (Lección 25)

| #   | Lección             | Qué Aprenderás                          |
| --- | ------------------- | --------------------------------------- |
| 25  | Executive Summaries | Templates, traducciones técnico-negocio |

**Al completar la Lección 25 habrás implementado:**

- ✅ Templates para Executive Summary
- ✅ Ejemplos de Sprint Summary
- ✅ Security Audit Report template
- ✅ Prompts de IA para generación automática

---

### ♿ UX & Accessibility (Lecciones 26-29)

| #   | Lección               | Qué Aprenderás                         |
| --- | --------------------- | -------------------------------------- |
| 26  | Accessibility         | WCAG 2.1 AA, Nielsen's 10 heuristics   |
| 27  | Usable Forms          | Progressive validation, loading states |
| 28  | Microcopy             | Verb+noun buttons, empty states        |
| 29  | Perceived Performance | Skeleton screens, optimistic UI        |

**Al completar la Lección 29 (FINAL) habrás implementado:**

- ✅ **167 tests unitarios/integración** pasando
- ✅ **21 tests E2E** pasando
- ✅ **100% coverage** en archivos de features
- ✅ Skeleton screens con animación pulse
- ✅ Optimistic UI para acciones de carrito
- ✅ Accesibilidad WCAG 2.1 AA completa

---

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js 18+**
- **pnpm 8+** (no uses npm, este proyecto usa pnpm)

### Instalación

```bash
# 1. Navegar al directorio del curso
cd ai-course

# 2. Instalar dependencias
pnpm install

# 3. Copiar variables de entorno (opcional)
cp .env.example .env

# 4. Iniciar servidor de desarrollo
pnpm run dev

# 5. Abrir en el navegador
# http://localhost:5173
```

---

## 🧪 Testing

Este proyecto sigue **Test-Driven Development (TDD)** y mantiene alta cobertura de tests.

### Comandos de Testing

```bash
# Tests unitarios + integración (Vitest)
pnpm test

# Modo watch para TDD
pnpm test:watch

# Con reporte de cobertura
pnpm test:coverage

# Tests E2E (Playwright - todos los navegadores)
pnpm test:e2e

# Tests E2E (solo Chromium - más rápido para CI)
pnpm test:e2e --project=chromium

# Ver último reporte de Playwright
pnpm exec playwright show-report
```

### Ejemplo de Salida de Tests

```
✅ calculateSubtotal › should sum item prices correctly (2ms)
✅ formatPrice › should format price as USD (1ms)
✅ ProductCard › should render product information (45ms)
✅ E2E › Shopping Journey › should complete checkout (1.2s)

Test Files  19 passed (19)
Tests  167 passed (167)
Duration  16.78s
```

### Cobertura Estratégica (100/80/0 Rule)

```
CORE Tier (100% obligatorio):
  ✅ calculateSubtotal.ts    100% coverage
  ✅ formatPrice.ts          100% coverage
  ✅ validatePassword.ts     100% coverage
  ✅ DiscountStrategy.ts     100% coverage

IMPORTANT Tier (80%+ obligatorio):
  ✅ ProductCard.tsx         100% coverage
  ✅ ShoppingCart.tsx        100% coverage
  ✅ LoginDemo.tsx           100% coverage
  ✅ SecurityChecklist.tsx   98.46% coverage

INFRASTRUCTURE Tier (0% estratégico):
  - main.tsx, env.ts, sentry.ts (TypeScript valida, no hay lógica que testear)
```

---

## 🛠️ Desarrollo

### Scripts Disponibles

```bash
# Desarrollo
pnpm run dev          # Iniciar dev server (localhost:5173)
pnpm run build        # Build para producción
pnpm run preview      # Preview del build de producción

# Calidad de Código
pnpm run lint         # Ejecutar ESLint
pnpm run lint:fix     # Arreglar issues de ESLint automáticamente

# Testing
pnpm test             # Tests unitarios
pnpm test:coverage    # Tests con reporte de cobertura
pnpm test:e2e         # Tests E2E en todos los navegadores

# Storybook
pnpm run storybook    # Iniciar Storybook en localhost:6006

# Métricas
pnpm run metrics      # Dashboard de métricas de salud del proyecto
```

### Quality Gates (Husky)

Este proyecto usa Husky hooks para asegurar calidad:

**Pre-commit (antes de cada commit):**

1. ✅ ESLint (estilo de código)
2. ✅ Tests unitarios
3. ✅ Build de TypeScript

**Pre-push (antes de cada push):**

1. ✅ Test coverage check (100% en CORE tier)
2. ✅ Tests E2E (Chromium)

💡 **Tip**: Si los hooks fallan, tu commit/push será rechazado. Arregla los errores antes de continuar.

---

## 🏗️ Arquitectura

### Estructura del Proyecto

```
src/
  features/                    # Features de la aplicación (1 carpeta = 1 feature)
    product-catalog/           # Funcionalidad de catálogo de productos
      ProductCatalog.tsx       # Container principal
      ProductCatalog.test.tsx  # Tests de integración
      components/              # Componentes específicos del feature
        ProductCard.tsx
        ProductCard.test.tsx
    shopping-cart/             # Funcionalidad del carrito
      ShoppingCart.tsx
      components/
        CartItem.tsx
        CartSummary.tsx
    auth/                      # Demo de autenticación
      LoginDemo.tsx
    security/                  # Security checklist
      SecurityChecklist.tsx

  shared/                      # Código compartido (usado por 2+ features)
    utils/                     # Funciones utilitarias
      calculateSubtotal.ts     # Cálculo de subtotal
      formatPrice.ts           # Formateo de precios
      validatePassword.ts      # Validación de contraseñas
    strategies/                # Strategy Pattern
      DiscountStrategy.ts      # Interface
      DiscountCalculator.ts    # Factory
    constants/
      businessRules.ts         # Reglas de negocio centralizadas
    data/
      products.ts              # Datos de productos

  infrastructure/              # Cross-cutting concerns
    sentry.ts                  # Setup de Sentry
    auth.ts                    # Lógica de autenticación
    env.ts                     # Validación de variables de entorno
    SentryErrorBoundary.tsx    # Error boundary

e2e/                           # Tests End-to-End
  pages/                       # Page Object Model
    ProductCatalogPage.ts
    ShoppingCartPage.ts
  shopping-journey.spec.ts     # Tests de flujos completos
  auth-login.spec.ts           # Tests de autenticación
  visual-regression.spec.ts    # Tests de regresión visual

docs/
  slides/                      # Slides de cada lección (formato Slidev)
    01-testing-setup.md
    02-tdd.md
    ...
    29-perceived-performance.md
  adr/                         # Architectural Decision Records
    001-state-management.md
    002-testing-strategy.md
```

### Patrones Clave Aplicados

1. **Scope Rule**:
   - Código usado por 1 feature → queda local en ese feature
   - Código usado por 2+ features → va a `shared/`

2. **Strategy Pattern**:
   - Cálculo de descuentos con estrategias intercambiables
   - Factory para seleccionar estrategia correcta

3. **Container/Presentational**:
   - Containers: Manejan lógica y estado
   - Presentational: Solo UI puro

4. **Test-Driven Development**:
   - Tests escritos ANTES de la implementación
   - Red → Green → Refactor

5. **Page Object Model (E2E)**:
   - Abstracción de páginas en clases
   - Mantenibilidad de tests E2E

---

## 🔒 Seguridad

Este proyecto implementa **OWASP Top 10 2021**:

| OWASP | Categoría                 | Implementación                                |
| ----- | ------------------------- | --------------------------------------------- |
| A01   | Access Control            | Role-based authorization (`requireRole`)      |
| A02   | Cryptographic Failures    | bcrypt + HTTPS (documentado)                  |
| A03   | Injection                 | XSS prevention con DOMPurify                  |
| A04   | Insecure Design           | Rate limiting + account lockout (documentado) |
| A05   | Security Misconfiguration | Validación de env con Zod                     |
| A06   | Vulnerable Components     | npm audit en CI/CD                            |
| A07   | Auth Failures             | Password validation + JWT expiration          |
| A08   | Software Integrity        | JWT signing con secrets                       |
| A09   | Logging & Monitoring      | Sentry error tracking                         |
| A10   | SSRF                      | N/A (frontend-only app)                       |

Ver el componente `SecurityChecklist` en la app para detalles completos.

---

## 📊 Observabilidad

Integrado con [Sentry](https://sentry.io) para monitoreo en producción:

### Funcionalidades Implementadas

- ✅ **Error tracking** con breadcrumbs contextuales
- ✅ **Performance monitoring** (Core Web Vitals)
- ✅ **Session replay** para debugging visual
- ✅ **User feedback dialog** para reportes de usuarios
- ✅ **Custom metrics** (cart size, cart value)

### Configuración de Sentry

```bash
# 1. Crear cuenta gratuita en sentry.io
# 2. Copiar tu DSN
# 3. Crear archivo .env
echo "VITE_SENTRY_DSN=tu-dsn-aqui" > .env
echo "VITE_SENTRY_ENV=development" >> .env

# 4. Reiniciar servidor
pnpm run dev
```

---

## 🎨 Storybook

Documentación visual de componentes con Storybook:

```bash
# Iniciar Storybook
pnpm run storybook

# Build de Storybook
pnpm run build-storybook
```

**Incluye:**

- Stories para todos los componentes principales
- Tests de accesibilidad con axe-core
- Documentación de props con TypeScript
- Variaciones de estado (empty, loading, error, success)

---

## 📖 Documentación Adicional

### Archivos Clave

- **`FOLLOWUP.md`** - Tracker detallado de progreso lección por lección
- **`CLAUDE.md`** - Instrucciones para el asistente de IA
- **`docs/adr/`** - Architectural Decision Records
- **`docs/slides/`** - Slides de todas las lecciones

---

## 🧩 Stack Tecnológico

### Core

- **React 19** - Biblioteca UI con features modernos
- **TypeScript** - Type safety
- **Vite** - Build tool rápido
- **Tailwind CSS v4** - Utility-first styling

### Testing

- **Vitest** - Unit/integration testing (reemplazo de Jest)
- **Testing Library** - Component testing user-centric
- **Playwright** - E2E testing cross-browser

### Quality & Security

- **ESLint + SonarJS** - Linting de calidad de código
- **eslint-plugin-jsx-a11y** - Linting de accesibilidad
- **Husky** - Git hooks para quality gates
- **Zod** - Runtime validation
- **DOMPurify** - XSS prevention

### Observability

- **Sentry** - Error tracking, performance monitoring

### Documentation

- **Storybook 9** - Component documentation
- **Slidev** - Slides de presentación
- **JSDoc** - Inline documentation

---

## 🎯 Mejores Prácticas Demostradas

### Testing

- ✅ TDD (Test-Driven Development)
- ✅ AAA Pattern (Arrange-Act-Assert)
- ✅ User-centric testing (Testing Library)
- ✅ Page Object Model para E2E
- ✅ Strategic coverage (100/80/0)
- ✅ Visual regression testing

### Code Quality

- ✅ No code smells (SonarJS)
- ✅ Strategy Pattern para variabilidad
- ✅ Business rules centralizadas
- ✅ Dead code elimination
- ✅ Primitive obsession elimination

### Security

- ✅ OWASP Top 10 2021
- ✅ Input sanitization (DOMPurify)
- ✅ Strong password validation
- ✅ Environment variable validation
- ✅ Security checklist visible

### Accessibility

- ✅ WCAG 2.1 Level AA
- ✅ Nielsen's 10 Usability Heuristics
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Screen reader support

### UX

- ✅ Progressive validation (blur → real-time)
- ✅ Inline error messages
- ✅ Loading states
- ✅ Success feedback
- ✅ Optimistic UI
- ✅ Skeleton screens
- ✅ Microcopy excellence

---

## 📚 Recursos de Aprendizaje

### Cómo Estudiar este Proyecto

**Opción 1: Lección por Lección (Recomendado)**

```bash
# Ver las slides de la lección
./present.sh 10

# Implementar los ejercicios prácticos con IA

# Ejecutar los tests para verificar
pnpm test
```

**Opción 2: Estudiar las Slides Directamente**

```bash
# Ver slides de lección específica
./present.sh 15

# O manualmente
cd docs/slides
npx slidev 15-sentry-errors.md
```

### Tips para Estudiantes

1. **Empieza desde la Lección 1** - Cada lección construye sobre la anterior
2. **Estudia las slides ANTES de implementar** - Entiende el "por qué"
3. **Implementa los ejercicios con IA** - Usa los prompts en las slides con ChatGPT/Claude
4. **Ejecuta los tests en cada lección** - Verifica tu implementación
5. **Practica el workflow TDD** - Red → Green → Refactor
6. **Consulta FOLLOWUP.md** - Tiene notas detalladas de cada lección

---

## 🤝 Contribuir

Este es un proyecto educativo diseñado para enseñar prácticas profesionales de calidad de software.

Si encuentras errores o quieres sugerir mejoras, comunícate con la Academia.

---

## 📄 Licencia

MIT License - Libre para usar con propósitos educativos.

---

## 🙏 Agradecimientos

Construido con ❤️ para el Curso de IA

- React 19 + TypeScript + Vite
- Test-Driven Development
- OWASP Security Best Practices
- Production-Ready Patterns
- Accessibility First
- User Experience Excellence

---

## 📞 Contacto

¿Tienes preguntas sobre el curso? Comunícate con la Academia.

**¡Feliz aprendizaje! 🚀**
