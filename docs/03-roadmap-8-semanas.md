# 03 — Roadmap de 8 semanas (Lean MVP v0.1)

## Semana 1 — Fundação
- **Objetivo:** deixar base técnica pronta.
- **Entregáveis:** monorepo, web executável, schema inicial, docs operacionais.
- **Critérios de aceite:** `pnpm dev`, `pnpm lint`, `pnpm typecheck` funcionando.
- **Riscos:** travar em setup de ferramentas.

## Semana 2 — Auth/RBAC
- **Objetivo:** login e controle de acesso por tenant/loja.
- **Entregáveis:** integração Better Auth, memberships com role.
- **Critérios de aceite:** owner/manager/seller com permissões mínimas separadas.
- **Riscos:** modelagem incompleta de sessão/convite.

## Semana 3 — Lojas/Usuários
- **Objetivo:** gestão interna da operação.
- **Entregáveis:** CRUD de lojas e usuários, associação em memberships.
- **Critérios de aceite:** onboarding de loja + usuário em fluxo único.
- **Riscos:** conflito entre escopo multi-loja e UX.

## Semana 4 — Clientes/Receitas
- **Objetivo:** registrar base de pacientes.
- **Entregáveis:** cadastro de clientes e receitas, busca por telefone/nome.
- **Critérios de aceite:** receita vinculada ao cliente com validade.
- **Riscos:** excesso de campos clínicos cedo demais.

## Semana 5 — Produtos/Estoque
- **Objetivo:** controlar catálogo e saldo.
- **Entregáveis:** cadastro de produtos, inventário por loja, ajustes de estoque.
- **Critérios de aceite:** alerta de estoque mínimo funcionando.
- **Riscos:** regras de custo/preço sem validação.

## Semana 6 — PDV/Vendas
- **Objetivo:** registrar vendas com itens/pagamento.
- **Entregáveis:** carrinho simples, fechamento de venda, baixa de estoque.
- **Critérios de aceite:** venda salva com itens + pagamento.
- **Riscos:** inconsistência transacional entre venda e estoque.

## Semana 7 — Caixa + Financeiro
- **Objetivo:** caixa diário e contas.
- **Entregáveis:** abertura/fechamento de caixa, movimentações e contas a pagar/receber.
- **Critérios de aceite:** fechamento de caixa confere com vendas do período.
- **Riscos:** divergência de fluxo manual vs sistema.

## Semana 8 — Dashboard + Piloto
- **Objetivo:** visão operacional e preparação de pilotos.
- **Entregáveis:** dashboard básico e rotina de feedback com lojas piloto.
- **Critérios de aceite:** indicadores mínimos (vendas, ticket, saldo de caixa, contas).
- **Riscos:** pouca adoção sem rotina de suporte.
