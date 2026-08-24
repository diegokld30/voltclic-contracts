// Extensiones .js explícitas en los imports relativos: TypeScript las emite tal cual y son
// OBLIGATORIAS para que la salida ESM resuelva correctamente. En CJS también funcionan.
export * from './enums.js';
export * from './money.js';
export * from './realtime.js';

/** Config de marca por tenant (tenants.brand_config jsonb). Una sola build para todos. */
export interface BrandConfig {
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  domain?: string;
  displayName?: string;
}
