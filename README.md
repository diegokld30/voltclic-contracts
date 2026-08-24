# @voltclic/contracts

Contratos compartidos entre el backend (`voltclic-api`) y el frontend (`voltclic-web`):
enums de dominio (estados OCPP, sesión, wallet, pagos), dinero en centavos enteros, y
eventos/DTOs del canal realtime. **Fuente única de verdad** — si un contrato cambia aquí,
sube de versión y ambos consumidores lo adoptan explícitamente.

## Build
```bash
pnpm install
pnpm build      # genera dist/ (CJS + ESM + .d.ts) con tsup
```

## Publicar (GitHub Packages)
```bash
cp .npmrc.example .npmrc     # define GITHUB_TOKEN con scope write:packages
pnpm version patch|minor|major
pnpm publish
```

## Consumir desde api/web
En cada repo, `.npmrc` con el registry de `@voltclic` + `GITHUB_TOKEN` (read:packages), y:
```bash
pnpm add @voltclic/contracts
```

## Desarrollo local (antes de publicar)
Para iterar sin publicar, enlaza el paquete:
```bash
# en voltclic-contracts
pnpm build && pnpm link --global
# en voltclic-api y voltclic-web
pnpm link --global @voltclic/contracts
```

## Regla
No metas aquí lógica de framework (NestJS/React) ni dependencias pesadas: solo tipos,
enums y funciones puras (p. ej. helpers de dinero). Debe poder importarse desde cualquier lado.
