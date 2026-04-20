# 07 — Estratégia de Branches (padrão OptiGestor)

## Objetivo
Padronizar entrega contínua por PR, com proteção de branch e fluxo simples para solo dev + IA.

## Branches padrão
- `main`: produção estável.
- `develop`: integração contínua das features.

### Setup inicial no repositório
```bash
git checkout main
git checkout -b develop
git push -u origin develop
```
Depois disso, configure a branch padrão para `develop` no GitHub (Settings → Branches → Default branch), mantendo `main` para releases.

## Proteção recomendada no GitHub

### `main`
1. Settings → Branches → Add branch protection rule.
2. Branch name pattern: `main`.
3. Marcar:
   - Require a pull request before merging
   - Require approvals (mínimo 1)
   - Dismiss stale pull request approvals when new commits are pushed
   - Require status checks to pass before merging (lint/build)
   - Restrict who can push (opcional, quando houver time)

### `develop`
1. Add branch protection rule para `develop`.
2. Marcar:
   - Require a pull request before merging
   - Require status checks to pass before merging

## Convenção de nomes de branch
- `feat/<descricao-curta>`
- `fix/<descricao-curta>`
- `refactor/<descricao-curta>`
- `docs/<descricao-curta>`
- `release/<versao>` (opcional)

Exemplos:
- `feat/auth-rbac-base`
- `fix/sales-total-rounding`
- `docs/roadmap-v0-1`

## Commits (Conventional Commits)
- `feat: adicionar fluxo de abertura de caixa`
- `fix: corrigir cálculo de desconto no PDV`
- `docs: atualizar plano de pilotos`
- `refactor: simplificar service de estoque`

## Fluxo de PR
1. Criar branch a partir de `develop`.
2. Implementar escopo pequeno e objetivo.
3. Rodar lint/build/testes locais.
4. Abrir PR para `develop` com checklist de validação.
5. Após estabilização, abrir PR `develop` → `main` para release.

## Helper local para criar branches
Use o script:

```bash
./scripts/new-branch.sh feat auth-rbac-base
```

Ele cria e troca para `feat/auth-rbac-base`.
