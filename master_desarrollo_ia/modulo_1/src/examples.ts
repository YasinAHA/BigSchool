import * as b01 from './blocks/b01-intro';

type ExampleFn = () => void | Promise<void>;

/**
 * Clave: "bXX:eYY" -> función ejemplo
 * Ej: "b01:e01" ejecuta b01.e01_tiposBasicos
 */
export const EXAMPLES: Record<string, ExampleFn> = {
    'b01:e01': b01.e01_tiposBasicos,
    'b01:e02': b01.e02_funciones,

    /*     'b02:e01': b02.e01_singleResponsibility,
        'b02:e02': b02.e02_openClosed, */
};