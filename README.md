<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Pokeminho API

[![Coverage Status](https://img.shields.io/badge/coverage-100%25-brightgreen)](./coverage)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

API RESTful em NestJS seguindo Clean Architecture, integração com PokeAPI, MongoDB e Redis. Permite listar pokémons, gerenciar favoritos e cachear resultados.

---

## Sumário

- [Funcionalidades](#funcionalidades)
- [Tabela de Rotas](#tabela-de-rotas)
- [Exemplos de Requisição](#exemplos-de-requisição)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Como rodar o projeto](#como-rodar-o-projeto)
- [Testes](#testes)
- [Cobertura de Testes](#cobertura-de-testes)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuição](#contribuição)
- [Contato](#contato)
- [Licença](#licença)

---

## Funcionalidades

- Listar pokémons da PokeAPI (com paginação e cache Redis)
- Adicionar/remover pokémons favoritos (persistência MongoDB)
- Listar favoritos

---

## Tabela de Rotas

| Método | Rota               | Descrição                        |
| ------ | ------------------ | -------------------------------- |
| GET    | /pokemon/list      | Lista pokémons (paginação/cache) |
| GET    | /pokemon/favorites | Lista favoritos                  |
| POST   | /pokemon/favorite  | Adiciona favorito                |
| DELETE | /pokemon/favorite  | Remove favorito                  |

---

## Exemplos de Requisição

### Listar pokémons

```bash
curl 'http://localhost:3000/pokemon/list?offset=0&limit=10'
```

### Listar favoritos

```bash
curl 'http://localhost:3000/pokemon/favorites'
```

### Adicionar favorito

```bash
curl -X POST 'http://localhost:3000/pokemon/favorite?id=1'
```

### Remover favorito

```bash
curl -X DELETE 'http://localhost:3000/pokemon/favorite?id=1'
```

---

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```
MONGODB_URI=mongodb://localhost:27017/pokeminho
REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## Como rodar o projeto

```bash
npm install
npm run start:dev
```

Acesse: [http://localhost:3000/pokemon/list](http://localhost:3000/pokemon/list)

---

## Testes

- **Unitários e integração:**
  ```bash
  npm run test
  ```
- **Cobertura:**
  ```bash
  npm run test -- --coverage
  ```

> Para testes de integração, é necessário MongoDB e Redis ativos.

---

## Cobertura de Testes

- Cobertura atual: **100%** (statements, branches, functions, lines)
- Gere o relatório com:
  ```bash
  npm run test -- --coverage
  ```

---

## Estrutura do Projeto

- `src/domain`: entidades e contratos
- `src/application`: use cases e DTOs
- `src/infrastructure`: repositórios, integrações externas, schemas, serviços
- `src/presentation`: controllers (rotas)

---

## Contribuição

1. Fork este repositório
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit suas mudanças: `git commit -m 'feat: minha feature'`
4. Push para o branch: `git push origin minha-feature`
5. Abra um Pull Request

---

## Contato

Dúvidas ou sugestões? Abra uma issue ou envie um e-mail para [seu-email@dominio.com].

---

## Licença

MIT

---
