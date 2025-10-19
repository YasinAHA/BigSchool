// src/infrastructure/http/scope.ts
import { AppContainer } from '@composition/container';

export type RequestScope = ReturnType<typeof makeRequestScope>
export function makeRequestScope(container: AppContainer) {
    // Aquí podríamos agregar lógica específica por solicitud si es necesario
    return {
        ...container.useCases,
        requestId: crypto.randomUUID() // Ejemplo de dato específico por solicitud
    }
}


// En el controlador 

const scope = makeRequestScope(container);
await scope.addItemToOrder.execute(...);