# 04 — Backlog IA-ready (copiar para GitHub Issues)

## 1) Setup Better Auth no web
- **Contexto:** base de autenticação ainda não integrada.
- **Escopo:** configurar Better Auth, login/logout e sessão básica.
- **Fora de escopo:** convite avançado e SSO.
- **Critérios de aceite:** usuário autentica e sessão persiste.
- **Dica técnica:** usar `users.authUserId` como vínculo.
- **Estimativa:** M

## 2) RBAC por membership
- **Contexto:** permissões por tenant/loja.
- **Escopo:** middleware e guard por role (`owner`, `manager`, `seller`, `assistant`).
- **Fora de escopo:** ABAC avançado.
- **Critérios de aceite:** seller não acessa tela administrativa.
- **Dica técnica:** usar tabela `memberships`.
- **Estimativa:** M

## 3) CRUD de lojas
- **Contexto:** operação multi-loja.
- **Escopo:** listar/criar/editar/desativar stores.
- **Fora de escopo:** importação em massa.
- **Critérios de aceite:** unicidade `(tenant_id, code)` aplicada.
- **Dica técnica:** validação com Zod + feedback de erro amigável.
- **Estimativa:** S

## 4) CRUD de usuários + associação em loja
- **Contexto:** gestão de equipe.
- **Escopo:** cadastro de usuário e vínculo em memberships.
- **Fora de escopo:** auditoria completa.
- **Critérios de aceite:** usuário pode existir em mais de uma loja.
- **Dica técnica:** separar cadastro de usuário e vínculo de role.
- **Estimativa:** M

## 5) CRUD de clientes
- **Contexto:** base de pacientes.
- **Escopo:** cadastro, edição e busca por nome/telefone.
- **Fora de escopo:** prontuário completo.
- **Critérios de aceite:** cadastro com nome obrigatório.
- **Dica técnica:** indexar campos de busca no banco.
- **Estimativa:** S

## 6) Registro de receitas
- **Contexto:** controle de prescrição óptica.
- **Escopo:** criar receita vinculada a cliente.
- **Fora de escopo:** anexos de PDF/imagem.
- **Critérios de aceite:** status e validade salvos corretamente.
- **Dica técnica:** defaults por enum `prescription_status`.
- **Estimativa:** S

## 7) CRUD de produtos
- **Contexto:** catálogo de venda.
- **Escopo:** cadastro de produto por loja com SKU único.
- **Fora de escopo:** integração com fornecedor.
- **Critérios de aceite:** bloqueio de SKU duplicado na mesma loja.
- **Dica técnica:** usar constraint `(tenant_id, store_id, sku)`.
- **Estimativa:** S

## 8) Inventário e ajuste de estoque
- **Contexto:** manter saldo confiável.
- **Escopo:** tela de saldo e ação de ajuste manual.
- **Fora de escopo:** leitura de código de barras.
- **Critérios de aceite:** quantidade final atualiza sem inconsistência.
- **Dica técnica:** registrar `last_movement_type`.
- **Estimativa:** M

## 9) PDV simples com itens
- **Contexto:** operação de venda no balcão.
- **Escopo:** adicionar/remover item e calcular subtotal/total.
- **Fora de escopo:** promoções complexas.
- **Critérios de aceite:** total da venda calculado corretamente.
- **Dica técnica:** validar payload via `createSaleSchema`.
- **Estimativa:** M

## 10) Registro de pagamentos
- **Contexto:** fechamento financeiro da venda.
- **Escopo:** múltiplas formas de pagamento por venda.
- **Fora de escopo:** conciliação bancária automática.
- **Critérios de aceite:** soma dos pagamentos cobre o total.
- **Dica técnica:** enum `payment_method` para padronização.
- **Estimativa:** S

## 11) Abertura/fechamento de caixa
- **Contexto:** controle diário do operador.
- **Escopo:** abrir sessão, registrar fechamento e valor final.
- **Fora de escopo:** reconciliação por extrato.
- **Critérios de aceite:** não permitir duas sessões abertas na mesma loja.
- **Dica técnica:** validar sessão ativa antes de abrir nova.
- **Estimativa:** M

## 12) Movimentações de caixa
- **Contexto:** sangria/suprimento/ajustes.
- **Escopo:** lançar movimentação com tipo e valor.
- **Fora de escopo:** aprovação multinível.
- **Critérios de aceite:** trilha mínima de auditoria por usuário.
- **Dica técnica:** persistir `createdByMembershipId`.
- **Estimativa:** S

## 13) Contas a pagar/receber
- **Contexto:** visão financeira básica.
- **Escopo:** criar/listar/baixar `finance_entries`.
- **Fora de escopo:** DRE completa.
- **Critérios de aceite:** status transita entre pending/partial/paid.
- **Dica técnica:** atualizar `paidAmount` incrementalmente.
- **Estimativa:** M

## 14) Dashboard operacional
- **Contexto:** visão rápida para tomada de decisão.
- **Escopo:** cards de vendas, ticket médio, caixa e contas em aberto.
- **Fora de escopo:** BI avançado.
- **Critérios de aceite:** dados do dia e período selecionado.
- **Dica técnica:** criar agregações no backend antes do front.
- **Estimativa:** M

## 15) Instrumentação mínima (erros)
- **Contexto:** reduzir tempo de diagnóstico no piloto.
- **Escopo:** captura de erro em fluxo crítico.
- **Fora de escopo:** observabilidade full stack.
- **Critérios de aceite:** erro crítico gera evento rastreável.
- **Dica técnica:** iniciar com camada server e actions.
- **Estimativa:** S
