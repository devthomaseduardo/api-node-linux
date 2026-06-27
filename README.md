Show. Próximo passo: **revisar o README.md em português**, com as rotas reais que já criamos.

No terminal:

```bash
code .
```

Abre o arquivo:

```text
README.md
```

Substitui o conteúdo por este:

````md
# API Node.js em Servidor Linux

API REST criada com Node.js, TypeScript, Fastify, Prisma e PostgreSQL.

O objetivo deste projeto é praticar backend real com banco de dados, rotas HTTP, persistência e preparação para execução em ambiente Linux.

## Stack utilizada

- Node.js
- TypeScript
- Fastify
- Prisma
- PostgreSQL
- dotenv
- CORS

## Funcionalidades implementadas

- Health check da API
- Cadastro de clientes
- Listagem de clientes
- Tratamento de e-mail duplicado
- Cadastro de projetos vinculados a clientes
- Listagem de projetos com dados do cliente
- Atualização de status do projeto

## Rotas da API

### Health check

```http
GET /health
````

Exemplo:

```bash
curl http://localhost:3333/health
```

### Listar clientes

```http
GET /clients
```

Exemplo:

```bash
curl http://localhost:3333/clients
```

### Criar cliente

```http
POST /clients
```

Exemplo:

```bash
curl -X POST http://localhost:3333/clients \
  -H "Content-Type: application/json" \
  -d '{"name":"Cliente Teste","email":"cliente.teste@example.com","phone":"11999990000"}'
```

### Listar projetos

```http
GET /projects
```

Exemplo:

```bash
curl http://localhost:3333/projects
```

### Criar projeto

```http
POST /projects
```

Exemplo:

```bash
curl -X POST http://localhost:3333/projects \
  -H "Content-Type: application/json" \
  -d '{"name":"Projeto API Node Linux","clientId":"ID_DO_CLIENTE"}'
```

### Atualizar status do projeto

```http
PATCH /projects/:id/status
```

Exemplo:

```bash
curl -X PATCH http://localhost:3333/projects/ID_DO_PROJETO/status \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}'
```

## Como rodar o projeto

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3333
HOST=0.0.0.0
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"
```

Não versionar o arquivo `.env`.

### 3. Rodar migrations

```bash
npx prisma migrate dev
```

### 4. Gerar Prisma Client

```bash
npx prisma generate
```

### 5. Rodar em desenvolvimento

```bash
npm run dev
```

## Banco de dados

Modelos criados:

* Client
* Project

Relação:

```text
Um cliente pode ter vários projetos.
Um projeto pertence a um cliente.
```

## Histórico de implementação

### 1. Base inicial da API

Foi criada a estrutura inicial do projeto com Node.js, TypeScript e Fastify.

Rota criada:

```text
GET /health
```

### 2. Configuração do banco

Foi configurado o PostgreSQL com Prisma.

Itens criados:

```text
Client
Project
_prisma_migrations
```

### 3. Rotas de clientes

Foram criadas rotas para listar e cadastrar clientes.

Rotas criadas:

```text
GET /clients
POST /clients
```

Também foi configurado tratamento para e-mail duplicado.

### 4. Rotas de projetos

Foram criadas rotas para listar projetos, criar projetos e atualizar status.

Rotas criadas:

```text
GET /projects
POST /projects
PATCH /projects/:id/status
```

## Padrão de commits

Este projeto usa commits com tipo em inglês e descrição em português.

Exemplos:

```bash
git commit -m "feat: adicionar rotas de clientes"
git commit -m "feat: adicionar rotas de projetos"
git commit -m "fix: corrigir erro de email duplicado"
git commit -m "docs: atualizar README com rotas da API"
```

Tipos usados:

```text
feat: nova funcionalidade
fix: correção de erro
docs: documentação
refactor: reorganização de código
chore: configuração ou dependências
test: testes
```

## Status atual

Projeto em desenvolvimento.

Etapas concluídas:

* API base criada
* Banco configurado
* Prisma configurado
* Rotas de clientes criadas
* Rotas de projetos criadas
* README documentado

Próximo passo:

Preparar execução em servidor Linux.
