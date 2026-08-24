/**
 * Dinero en COP. REGLA INNEGOCIABLE: el dinero se guarda y se opera en centavos ENTEROS
 * (bigint en BD, number entero en runtime dentro del rango seguro). NUNCA float.
 *
 * Estos helpers son la única forma permitida de convertir entre pesos visibles y centavos.
 */

export type Cents = number; // entero. En BD es bigint; en TS validar con Number.isSafeInteger.

export const CURRENCY = 'COP' as const;

/** Convierte pesos (posible decimal de UI) a centavos enteros, redondeando al centavo. */
export function pesosToCents(pesos: number): Cents {
  return Math.round(pesos * 100);
}

/** Convierte centavos enteros a pesos (solo para mostrar). No usar para operar. */
export function centsToPesos(cents: Cents): number {
  return cents / 100;
}

/** Formatea centavos como moneda colombiana para UI: 1234500 -> "$ 12.345". */
export function formatCOP(cents: Cents): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(centsToPesos(cents));
}

/** Guard: lanza si el valor no es un entero de centavos seguro (evita floats colados). */
export function assertCents(value: number, label = 'amount'): Cents {
  if (!Number.isSafeInteger(value)) {
    throw new Error(`${label} debe ser un entero de centavos seguro, recibido: ${value}`);
  }
  return value;
}
