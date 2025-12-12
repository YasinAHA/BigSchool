-- Create facturas table
CREATE TABLE IF NOT EXISTS facturas (
    id UUID PRIMARY KEY,
    numero VARCHAR(10) UNIQUE,
    cif_cliente VARCHAR(20) NOT NULL,
    denominacion_social VARCHAR(255) NOT NULL,
    direccion_fiscal TEXT NOT NULL,
    importe_base DECIMAL(10,2) NOT NULL,
    iva DECIMAL(10,2) NOT NULL,
    importe_total DECIMAL(10,2) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'borrador' CHECK (estado IN ('borrador', 'definitivo')),
    fecha_creacion TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    fecha_definitivo TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_facturas_cif_cliente ON facturas(cif_cliente);
CREATE INDEX IF NOT EXISTS idx_facturas_estado ON facturas(estado);
CREATE INDEX IF NOT EXISTS idx_facturas_numero ON facturas(numero) WHERE numero IS NOT NULL;

-- Create sequence for invoice numbers
CREATE SEQUENCE IF NOT EXISTS factura_number_seq START WITH 1 INCREMENT BY 1;