# OptiGestor — Lean MVP v0.1

Base prática de monorepo para construir o MVP com foco em execução rápida (solo dev + IA).

## Stack inicial
- Monorepo: Turborepo + pnpm
- Web: Next.js 15 + TypeScript + Tailwind (shadcn-ready)
- Banco: PostgreSQL + Drizzle
- Compartilhado: `packages/validators`, `packages/types`, `packages/utils`

## Estrutura

```txt
apps/
  web/
  desktop/
  mobile/
packages/
  db/
  validators/
  types/
  utils/
docs/
  01-estrutura-monorepo.md
  02-schema-inicial-drizzle.md
  03-roadmap-8-semanas.md
  04-backlog-ia-ready.md
  05-definition-of-done.md
  06-plano-pilotos.md
  07-branch-strategy.md
```

## Como começar

```bash
pnpm install
pnpm dev
```

Para rodar só web:

```bash
pnpm --filter web dev
```

## Banco (Drizzle)

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:studio
```

> Configure `DATABASE_URL` antes de gerar/aplicar migrações.

## Documentação
- [01 — Estrutura de Monorepo](docs/01-estrutura-monorepo.md)
- [02 — Schema inicial Drizzle](docs/02-schema-inicial-drizzle.md)
- [03 — Roadmap 8 semanas](docs/03-roadmap-8-semanas.md)
- [04 — Backlog IA-ready](docs/04-backlog-ia-ready.md)
- [05 — Definition of Done](docs/05-definition-of-done.md)
- [06 — Plano de 3 pilotos](docs/06-plano-pilotos.md)
- [07 — Estratégia de branches](docs/07-branch-strategy.md)
- [Branch strategy (atalho)](BRANCH_STRATEGY.md)

## Convenção de branches
Use o helper local:

```bash
./scripts/new-branch.sh feat auth-rbac-base
```
