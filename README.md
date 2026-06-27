# API Node Linux

API REST criada com Node.js, TypeScript e Fastify para prática de back-end em ambiente Linux.

O projeto faz parte de um laboratório de evolução full-stack, com foco em API, organização de ambiente, execução local, validação por terminal e preparação para banco de dados PostgreSQL.

## Objetivo

Construir uma API simples, funcional e documentada, rodando localmente em Linux, com uma rota de verificação de saúde da aplicação.

Esta primeira etapa valida:

- estrutura inicial do projeto
- servidor HTTP com Fastify
- TypeScript configurado
- variáveis de ambiente
- rota `/health`
- execução local na porta `3333`
- teste via `curl`

## Stack utilizada

- Node.js
- TypeScript
- Fastify
- TSX
- Dotenv
- CORS
- Linux
- Git

## Estrutura inicial

```text
api-node-linux/
├── src/
│   └── server.ts
├── package.json
├── tsconfig.json
├── .env
└── README.md
````

## Como rodar o projeto

Instale as dependências:

```bash
npm install
```

Rode a API em modo desenvolvimento:

```bash
npm run dev
```

A API será iniciada em:

```text
http://localhost:3333
```

## Rota disponível

### Health check

```http
GET /health
```

Teste no terminal:

```bash
curl localhost:3333/health
```

Resposta esperada:

```json
{
  "status": "ok",
  "service": "api-node-linux",
  "timestamp": "2026-06-27T14:32:37.953Z"
}
```

## Scripts

```json
{
  "dev": "tsx watch src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3333
HOST=0.0.0.0
```

## Status do projeto

Etapa atual concluída:

```text
API base criada e validada com sucesso.
```

O servidor subiu corretamente e a rota `/health` respondeu via terminal usando `curl`.

## Próximos passos

* configurar PostgreSQL
* criar schema inicial
* conectar a API ao banco
* criar rotas de clientes
* criar rotas de projetos
* rodar a API em background no Linux
* documentar execução e evidências

## Autor

Thomas Eduardo
Full-Stack Developer

Portfólio: thomaseduardo.online
GitHub: github.com/devthomaseduardo
LinkedIn: linkedin.com/in/devthomaseduardo

