import { EXAMPLES } from "./examples";

function printHelp(): void {
    console.log('Uso: npm run ex -- <clave>\n');
    console.log('Ejemplos disponibles:');
    Object.keys(EXAMPLES)
        .sort()
        .forEach((k) => console.log('  -', k));
}

async function main() : Promise<void> {
    const key = process.argv[2]; // p.ej. "b02:e01"
    if (!key || key.trim() === 'help') {
        printHelp();
        process.exit(1);
    }
    const fn = EXAMPLES[key];
    if (!fn) {
        console.error(`❌ Ejemplo no encontrado: ${key}\n`);
        printHelp();
        process.exit(1);
    }
    const res = fn();
    if (res instanceof Promise) await res;
    console.log('✅ Ejemplo finalizado:', key);
}

main().catch((e) => {
    console.error('Error al ejecutar el ejemplo:', e);
    process.exit(1);
});
