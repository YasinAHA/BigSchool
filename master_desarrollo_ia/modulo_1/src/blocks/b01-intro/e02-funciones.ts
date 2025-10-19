export function e02_funciones() {
    function sumar(a: number, b: number): number {
        return a + b;
    }

    const resultado = sumar(10, 20);
    function promesa(): Promise<string> {
        return new Promise(resolve => setTimeout(() => resolve('Hola desde la promesa'), 1000));
    }
    promesa().then(console.log);
    console.log({ resultado, sumar });
}