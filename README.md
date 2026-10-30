# NexoDesk

Sistema web de gerenciamento de chamados desenvolvido como desafio técnico
frontend. O NexoDesk centraliza a abertura, consulta, atualização e exclusão
de chamados em uma interface simples, responsiva e acessível.

## Por que este sistema foi criado?

Equipes de suporte precisam de uma visão rápida e organizada das solicitações
recebidas. O NexoDesk foi criado para resolver esse fluxo inicial:

- registrar solicitações com dados padronizados;
- acompanhar status, prioridade e setor responsável;
- localizar chamados rapidamente;
- consultar os detalhes sem perder o contexto da lista;
- manter uma experiência consistente em desktop e dispositivos móveis.

O projeto usa o MSW como uma API local simulada. Dessa forma, o fluxo completo
de CRUD pode ser demonstrado sem depender de um backend externo, enquanto a
camada de acesso aos dados permanece pronta para ser conectada a uma API real.

## Funcionalidades

### Gestão de chamados

- Listagem de chamados com:
  - título;
  - setor;
  - prioridade;
  - status;
  - data de criação;
  - solicitante.
- Criação de chamado em modal.
- Validação dos campos do formulário:
  - título com no mínimo 5 caracteres;
  - descrição com no mínimo 10 caracteres;
  - solicitante com no mínimo 3 caracteres;
  - e-mail válido;
  - setor obrigatório;
  - prioridade obrigatória;
  - status.
- Busca por título.
- Filtros por status e prioridade.
- Limpeza dos filtros.
- Visualização de todos os detalhes do chamado, exceto ID e data de atualização.
- Edição do status.
- Exclusão com confirmação em modal.
- Toasts de sucesso e erro usando Sonner.
- Dados persistidos no `localStorage` durante o uso do mock.

### Experiência e acessibilidade

- Layout responsivo para mobile, tablet e desktop.
- Tabela moderna em telas grandes e cards em telas pequenas.
- Cabeçalho fixo sem cobrir o conteúdo.
- Suporte a tema claro e escuro.
- Modais com:
  - `role="dialog"` ou `role="alertdialog"`;
  - `aria-modal`;
  - títulos e descrições associados;
  - foco inicial controlado;
  - fechamento com `Escape`;
  - fechamento ao clicar fora quando aplicável.
- Botões e menus com estados de foco visíveis.
- Mensagens de validação associadas aos respectivos campos.

## Tecnologias

- **React 19** — construção da interface.
- **TypeScript** — tipagem estática.
- **Vite** — desenvolvimento e build.
- **Tailwind CSS** — estilos responsivos e tema visual.
- **React Router** — roteamento da aplicação.
- **TanStack React Query** — cache, queries e mutations.
- **React Hook Form** — gerenciamento do formulário.
- **Zod** — validação e inferência de tipos.
- **MSW** — API mockada para o CRUD de chamados.
- **Sonner** — notificações toast.
- **React Icons** — ícones da interface.

## Pré-requisitos

- Node.js compatível com as versões atuais do Vite e TypeScript.
- npm.

## Como executar

### 1. Instalar dependências

Após clonar o repositório, na raiz do projeto execute:

```bash
npm install
```

### 2. Iniciar o ambiente de desenvolvimento

```bash
npm run dev
```

O Vite exibirá no terminal a URL local da aplicação, normalmente:

```text
http://localhost:5173
```

### 3. Gerar o build de produção

```bash
npm run build
```

### 4. Pré-visualizar o build

```bash
npm run preview
```

### 5. Executar o lint

```bash
npm run lint
```

## Arquitetura

O projeto segue uma organização por responsabilidade:

```text
src/
├── assets/                 # Imagens e recursos visuais
├── components/             # Componentes reutilizáveis da interface
│   ├── UI/                 # Componentes visuais compartilhados
│   ├── DeleteTicketModal.tsx
│   ├── InfoCard.tsx
│   ├── InfoTable.tsx
│   ├── NewTicketModal.tsx
│   └── TicketDetailsModal.tsx
├── config/                 # Rotas e configurações da aplicação
├── data/                   # Dados iniciais dos chamados
├── hooks/                  # Hooks de formulário, tema e dados
│   └── queries/            # Queries e mutations do React Query
├── mocks/                  # Handlers e inicialização do MSW
├── pages/                  # Páginas roteadas
├── schemas/                # Schemas Zod e tipos derivados
├── types/                  # Tipos compartilhados
├── utils/                  # Funções utilitárias
├── App.tsx
├── index.css
└── main.tsx
```

## Fluxo de dados

```text
Componente React
      │
      ▼
Hook do React Query
      │
      ▼
fetch('/tickets')
      │
      ▼
MSW intercepta a requisição
      │
      ▼
Handler CRUD em src/mocks/handlers.ts
      │
      ▼
localStorage + resposta JSON
      │
      ▼
React Query atualiza o cache
```

### Queries e mutations

As operações estão concentradas em
[`useTickets.queries.ts`](./src/hooks/queries/useTickets.queries.ts):

- `useTickets()` — lista chamados;
- `useTicket(id)` — busca um chamado específico;
- `useCreateTicket()` — cria um chamado;
- `useUpdateTicket()` — atualiza um chamado;
- `useDeleteTicket()` — exclui um chamado.

Após cada mutation, o cache da lista é invalidado para que a interface
apresente os dados atualizados. As mutations também exibem mensagens genéricas
de sucesso ou erro usando Sonner.

## API mockada

Os endpoints são definidos em
[`handlers.ts`](./src/mocks/handlers.ts):

| Método | Endpoint | Finalidade |
|---|---|---|
| `GET` | `/tickets` | Listar chamados |
| `GET` | `/tickets/:id` | Buscar um chamado |
| `POST` | `/tickets` | Criar chamado |
| `PATCH` | `/tickets/:id` | Atualizar chamado |
| `DELETE` | `/tickets/:id` | Excluir chamado |

O MSW é iniciado antes da renderização da aplicação em
[`main.tsx`](./src/main.tsx). A API simulada começa vazia para que novos
usuários não recebam chamados pré-cadastrados. Os exemplos permanecem
disponíveis em [`tickets.json`](./src/data/tickets.json); para testar com
dados mockados, basta retornar o conteúdo desse arquivo no método `load` de
[`handlers.ts`](./src/mocks/handlers.ts).

## Formato do chamado

```ts
type Ticket = {
  id: string
  title: string
  description: string
  requester: string
  email: string
  sector: 'TI' | 'RH' | 'Financeiro' | 'Operações' | 'Vendas'
  priority: 'Alta' | 'Média' | 'Baixa'
  status: 'Aberto' | 'Em andamento' | 'Concluído'
  createdAt: string
  updatedAt?: string
}
```

## Organização da tela principal

A página [`Home.tsx`](./src/pages/Home.tsx) coordena:

1. cabeçalho fixo e controle de tema;
2. cards de resumo;
3. botão de criação;
4. busca e filtros;
5. estados de carregamento e erro;
6. tabela/cards de chamados;
7. modal de criação.

As ações individuais ficam disponíveis no menu de cada chamado:

- **Ver detalhes**;
- **Editar status**;
- **Excluir chamado**.

## Persistência local

O mock usa a chave `nexodesk:tickets` no `localStorage`. Isso permite que
chamados criados, atualizados ou excluídos permaneçam disponíveis durante novas
aberturas da aplicação no mesmo navegador.

Para limpar os chamados persistidos manualmente, remova a chave pelo console
do navegador:

```js
localStorage.removeItem('nexodesk:tickets')
```

Depois, atualize a página.

## Decisões técnicas

- **React Query** foi usado para separar a interface da camada de dados e
  manter o cache sincronizado após mutations.
- **MSW** permite simular o backend sem criar dependência de infraestrutura
  durante o desafio.
- **Zod + React Hook Form** centralizam validação e reduzem inconsistências
  entre formulário e tipos.
- **Modais** mantêm o usuário no contexto da lista para ações rápidas.
- **Cards no mobile** evitam uma tabela ilegível ou dependente de scroll
  horizontal em telas pequenas.
- **Componentes separados** deixam criação, detalhes e exclusão independentes
  e reutilizáveis.

## Status do projeto

O fluxo principal de chamados está implementado e validado com:

```bash
npm run build
npm run lint
```

O lint pode apresentar um aviso relacionado ao arquivo gerado
`public/mockServiceWorker.js`; esse aviso não impede o build nem a execução da
aplicação.
