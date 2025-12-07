# Video 9: TDD - Validación de Password + Login Demo (15 min)

## Resultado Final
Validador de contraseñas OWASP + componente de login funcionando.

---

> ⚠️ **RECORDATORIO TDD** (aplicar a TODOS los componentes de este video):
> 1. Escribir tests PRIMERO → ejecutar → DEBE FALLAR (Red)
> 2. Implementar código MÍNIMO para pasar
> 3. Ejecutar tests → DEBEN PASAR (Green)
> 4. Refactorizar si es necesario
>
> **Esto aplica a: validatePassword, PasswordInput, Y LoginDemo**

---

## Paso 1: TDD - validatePassword

### 1.1 Test Primero (RED)

```
Crea el test para validatePassword. La función NO existe.

Ubicación: src/shared/utils/validatePassword.test.ts

import { validatePassword } from './validatePassword'

describe('validatePassword', () => {
  describe('length', () => {
    it('fails for < 12 characters', () => {
      const result = validatePassword('Short1!')
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('At least 12 characters')
    })

    it('passes for >= 12 characters', () => {
      const result = validatePassword('ValidPass123!')
      expect(result.errors).not.toContain('At least 12 characters')
    })
  })

  describe('uppercase', () => {
    it('fails without uppercase', () => {
      const result = validatePassword('nouppercase123!')
      expect(result.errors).toContain('At least one uppercase letter')
    })
  })

  describe('lowercase', () => {
    it('fails without lowercase', () => {
      const result = validatePassword('NOLOWERCASE123!')
      expect(result.errors).toContain('At least one lowercase letter')
    })
  })

  describe('number', () => {
    it('fails without number', () => {
      const result = validatePassword('NoNumbersHere!')
      expect(result.errors).toContain('At least one number')
    })
  })

  describe('special character', () => {
    it('fails without special character', () => {
      const result = validatePassword('NoSpecialChar123')
      expect(result.errors).toContain('At least one special character')
    })
  })

  describe('strength', () => {
    it('returns weak for invalid', () => {
      expect(validatePassword('weak').strength).toBe('weak')
    })

    it('returns medium for valid 12-15 chars', () => {
      expect(validatePassword('ValidPass123!').strength).toBe('medium')
    })

    it('returns strong for valid 16+ chars', () => {
      expect(validatePassword('VeryStrongPass123!').strength).toBe('strong')
    })
  })

  describe('valid password', () => {
    it('passes all rules', () => {
      const result = validatePassword('MySecurePass123!')
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })
  })
})
```

**Ejecutar (RED)**:
```bash
pnpm test validatePassword
```

### 1.2 Implementar (GREEN)

```
Implementa validatePassword para pasar los tests.

Ubicación: src/shared/utils/validatePassword.ts

interface PasswordValidation {
  isValid: boolean
  errors: string[]
  strength: 'weak' | 'medium' | 'strong'
}

export function validatePassword(password: string): PasswordValidation

Reglas:
- 12+ caracteres
- 1+ mayúscula
- 1+ minúscula
- 1+ número
- 1+ especial (!@#$%^&*...)

Strength:
- weak: no pasa validaciones
- medium: pasa todo, 12-15 chars
- strong: pasa todo, 16+ chars
```

**Ejecutar (GREEN)**:
```bash
pnpm test validatePassword
```

---

## Paso 2: TDD - PasswordInput

### 2.1 Test Primero (RED)

```
Crea el test para PasswordInput. El componente NO existe.

Ubicación: src/features/auth/components/PasswordInput.test.tsx

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PasswordInput } from './PasswordInput'

describe('PasswordInput', () => {
  it('renders password input field', () => {
    render(<PasswordInput value="" onChange={vi.fn()} showRequirements={false} />)
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('calls onChange when typing', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<PasswordInput value="" onChange={handleChange} showRequirements={false} />)
    await user.type(screen.getByLabelText(/password/i), 'test')
    expect(handleChange).toHaveBeenCalled()
  })

  it('shows requirements when showRequirements is true', () => {
    render(<PasswordInput value="weak" onChange={vi.fn()} showRequirements={true} />)
    expect(screen.getByText(/at least 12 characters/i)).toBeInTheDocument()
  })

  it('shows strength meter', () => {
    render(<PasswordInput value="ValidPass123!" onChange={vi.fn()} showRequirements={true} />)
    expect(screen.getByText(/medium/i)).toBeInTheDocument()
  })
})
```

**Ejecutar (RED)**:
```bash
pnpm test PasswordInput
```

### 2.2 Implementar (GREEN)

```
Implementa PasswordInput para pasar los tests.

Ubicación: src/features/auth/components/PasswordInput.tsx

Props:
- value: string
- onChange: (value: string) => void
- showRequirements: boolean

Features:
- Input type="password" con toggle para mostrar
- Lista de requisitos con ✓ verde / ✗ rojo
- Barra de fortaleza (weak/medium/strong)
- Colores: rojo → amarillo → verde

IMPORTANTE - Evitar conflicto con getByLabelText:
- El input debe tener: aria-label="Password"
- El botón toggle debe tener: aria-label="Show" (NO "Show password")
- Esto evita que getByLabelText(/password/i) encuentre múltiples elementos

Usa validatePassword internamente.
```

**Ejecutar (GREEN)**:
```bash
pnpm test PasswordInput
```

---

## Paso 3: TDD - LoginDemo Component

### 3.1 Test Primero (RED)

```
Crea test para LoginDemo.

Ubicación: src/features/auth/LoginDemo.test.tsx

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginDemo } from './LoginDemo'

describe('LoginDemo', () => {
  it('renders email and password inputs', () => {
    render(<LoginDemo />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('disables submit when form is invalid', () => {
    render(<LoginDemo />)
    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled()
  })

  it('enables submit when form is valid', async () => {
    const user = userEvent.setup()
    render(<LoginDemo />)

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'ValidPass123!')

    expect(screen.getByRole('button', { name: /sign in/i })).toBeEnabled()
  })

  it('shows success message on valid submit', async () => {
    const user = userEvent.setup()
    render(<LoginDemo />)

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'ValidPass123!')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(await screen.findByText(/welcome/i)).toBeInTheDocument()
  })

  it('shows error after 3 failed attempts', async () => {
    const user = userEvent.setup()
    render(<LoginDemo />)

    // Simular 3 intentos fallidos con credenciales "incorrectas"
    // IMPORTANTE: Limpiar campos ANTES de que el form se bloquee (en el 3er intento)
    for (let i = 0; i < 3; i++) {
      await user.type(screen.getByLabelText(/email/i), 'wrong@example.com')
      await user.type(screen.getByLabelText(/password/i), 'WrongPass123!')
      await user.click(screen.getByRole('button', { name: /sign in/i }))
      
      // Solo limpiar si NO es el último intento (el form se bloquea después del 3ro)
      if (i < 2) {
        await user.clear(screen.getByLabelText(/email/i))
        await user.clear(screen.getByLabelText(/password/i))
      }
    }

    expect(screen.getByText(/too many attempts/i)).toBeInTheDocument()
  })
})
```

**Ejecutar (RED)**:
```bash
pnpm test LoginDemo
```

### 3.2 Implementar (GREEN)

```
Implementa LoginDemo para pasar los tests.

Ubicación: src/features/auth/LoginDemo.tsx

Features:
- Form con email y password
- Validación de email (formato básico)
- Validación de password (usa validatePassword)
- Submit disabled si inválido
- Simular login:
  - demo@example.com + cualquier pass válido = success
  - Otro email = "Invalid credentials"
- Rate limiting: después de 3 fails, bloquear 30 segundos
- Mensaje de éxito: "Welcome, [email]!"
```

**Ejecutar (GREEN)**:
```bash
pnpm test LoginDemo
```

---

## Paso 4: Agregar a la App

```
Agrega LoginDemo a la aplicación.

Opciones:
1. Tab/sección separada "Account"
2. Modal que aparece al hacer click en icono de usuario
3. Página /login si agregas routing

Para este demo, agrégalo como sección colapsable en el header.
```

---

## Paso 5: Validación de Env con Zod (Bonus)

```bash
pnpm add zod
```

```
Crea validación de variables de entorno.

Ubicación: src/infrastructure/env.ts

import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url().optional(),
  VITE_ENV: z.enum(['development', 'production']).default('development'),
})

export const env = envSchema.parse(import.meta.env)

Crear .env.example con las variables.
```

---

## Paso 5: Verificación COMPLETA (OBLIGATORIO)

```bash
pnpm test:run      # Tests unitarios
pnpm test:e2e      # Tests E2E
pnpm lint          # Sin errores de lint
pnpm typecheck     # Sin errores de tipos
pnpm build         # Build exitoso
```

> ⚠️ Si alguno falla, corregir antes de continuar.

---

## Checkpoint

Al final del video tienes:
- ✅ validatePassword con 10 tests (TDD)
- ✅ PasswordInput con 4 tests (TDD)
- ✅ LoginDemo con 5 tests (TDD)
- ✅ Rate limiting funcionando
- ✅ (Bonus) Env validation con Zod
- ✅ ~69 tests totales
- ✅ Verificación completa pasando
- ✅ **SEGURIDAD BÁSICA** 🔒
