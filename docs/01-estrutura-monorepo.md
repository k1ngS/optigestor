# 01 — Estrutura de Monorepo (Turborepo + pnpm)

## Objetivo
Criar uma base simples, executável e pronta para crescimento com IA, sem travar o MVP.

## Estrutura

```txt
apps/
  web/       # Next.js 15 + TS + Tailwind + shadcn-ready (executável)
  desktop/   # placeholder Tauri com instruções
  mobile/    # placeholder Expo com instruções
packages/
  db/         # Drizzle config + schema + migrations
  validators/ # schemas Zod compartilhados
  types/      # tipos TS compartilhados
  utils/      # utilitários compartilhados
```

## Comandos base

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
```

### Comandos de banco (Drizzle)

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:studio
```

## Notas práticas
- `apps/web` já sobe com `pnpm --filter web dev`.
- `apps/desktop` e `apps/mobile` ficam em placeholder até entrar no roadmap.
- Estrutura favorece solo dev + AI pair programming com pacotes compartilhados claros.
