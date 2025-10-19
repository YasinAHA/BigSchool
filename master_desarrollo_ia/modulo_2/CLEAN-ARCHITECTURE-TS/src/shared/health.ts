export type HealthStatus = {
  status: 'ok' | 'error'
  timestamp: string
}

/**
 * Devuelve un objeto simple indicando el estado de salud del proceso.
 * Útil para comprobar que el tooling y la compilación funcionan correctamente.
 */
export function checkHealth(): HealthStatus {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
  }
}

export default checkHealth
