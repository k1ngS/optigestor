# 02 — Schema inicial Drizzle (Lean MVP v0.1)

## Entidades cobertas
- tenants
- stores
- users (com `authUserId` para integração Better Auth)
- memberships (RBAC)
- customers
- prescriptions
- products
- inventory (estoque)
- sales
- sale_items
- payments
- cash_sessions
- cash_movements
- finance_entries (contas a pagar/receber)

## Decisões de modelagem
- Multi-tenant por `tenant_id`.
- `users.authUserId` representa vínculo com provedor de autenticação (Better Auth).
- Enums aplicados para status, papéis e métodos de pagamento.
- Timestamps padrão em todas as tabelas críticas.
- Constraints de unicidade:
  - `tenants.slug`
  - `(tenant_id, code)` em stores
  - `(tenant_id, user_id, store_id)` em memberships
  - `(tenant_id, store_id, sku)` em products
  - `(store_id, product_id)` em inventory

## Scripts
No root:

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:studio
```

No pacote `@optigestor/db`:

```bash
pnpm --filter @optigestor/db db:generate
pnpm --filter @optigestor/db db:migrate
pnpm --filter @optigestor/db db:studio
```

## Fluxo de migração (starter)
1. Ajustar `DATABASE_URL` no ambiente.
2. Rodar `pnpm db:generate` para gerar arquivos em `packages/db/migrations`.
3. Rodar `pnpm db:migrate` para aplicar migração.
4. Validar no `pnpm db:studio`.
