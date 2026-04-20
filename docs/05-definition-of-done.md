# 05 — Definition of Done por módulo

## Auth/RBAC
- Fluxo login/logout funcional.
- Permissões por role aplicadas em rotas e ações.
- Validação de sessão/tenant no backend.
- Teste mínimo: 1 caso permitido + 1 negado por role.

## Stores/Users
- CRUD básico de lojas e usuários operante.
- Associação de usuário por membership válida.
- Constraint de unicidade respeitada.
- Teste mínimo: criação + edição + desativação.

## Customers/Prescriptions
- Cliente criado e buscável.
- Receita vinculada ao cliente com status/validade.
- Entrada validada por schema.
- Teste mínimo: criar cliente + receita.

## Products/Inventory
- Produto criado por loja com SKU único.
- Estoque com ajuste e saldo atualizado.
- Bloqueio de quantidade negativa indevida.
- Teste mínimo: ajuste positivo e negativo.

## POS/Sales
- Venda com itens calcula subtotal/total.
- Persistência de venda e itens no banco.
- Pagamento vinculado corretamente.
- Teste mínimo: venda simples com 1 item.

## Cash Register
- Abertura e fechamento de sessão de caixa.
- Movimentações registradas com tipo e usuário.
- Não há sessão duplicada aberta na mesma loja.
- Teste mínimo: ciclo abrir → movimentar → fechar.

## Finance
- Lançamento de contas a pagar/receber.
- Baixa parcial/total atualiza status.
- Validação de data/valor obrigatórios.
- Teste mínimo: criar título e marcar como pago.

## Dashboard
- Indicadores essenciais renderizados com dados reais.
- Filtros de período básicos funcionando.
- Sem vazamento de dados entre tenants.
- Teste mínimo: agregação por tenant.
