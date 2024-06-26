Instruções para baixar o back-end na máquina

1. baixar o nest 
md -> "npm install -g @nestjs/cli"
cmd -> "set path=%path%;C:\Users\822111000\AppData\Roaming\npm" (URL exemplo)
cmd -> nest -v (deve aparecer a versão)

2. Antes de abrir o projeto executar o comando -> "npm i"
3. Quando abrir o projeto criar um arquivo na raiz chamado ".env" com o seguinte conteudo

DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=senhaDoSeuBanco
DB_DATABASE=project_a3
DB_ENTITIES=dist/**/*.entity{.ts,.js}
DB_SYNCHRONIZE=true
JWT_SECRET=projetoa3

4. Crei um banco de dados no mysql com o nome "project_a3"

5. Rode o projeto - "npm run start:dev" (o projeto estará rodando na porta 3000)

6. As rotas se encontram no diretório - src/user/controller

------
------
------
------

Exemplos de Json para Crud no banco

Login Exemples

Post
{
  "email": "miguel@gmail.com",
  "senha": "Miguel@12345"
}

---

Perfil Exemples

{
  "cpf": "12345678901",
  "nome": "Miguel Arcanjo",
  "data_nascimento": "1990-01-01",
  "cargo": "Administrador",
  "loginIdLogin":1
}

---
Genero Exemples

Post
{
  "nome":"sertanejo"
}

---

Catalogo Exemples

Post
{
  "descricao":"Festa Junina",
  "preco_unitario":30.00,
  "vendido":0,
  "imagem":"localhost:3000/imagens/tardezinha.png",
  "generoIdGenero":1
}

---

Ingresso Exemples

{
  "nome":"camarote",
  "quantidade":100,
  "preco_unitario":60.00,
  "catalogoIdCatalogo":3
}

---

Carrinho Cabeca Exemples

Post
{
  "perfilIdPerfil":1
}

---

Itens Exemples

Post
{
  "desconto":0,
  "quantidade":1,
  "catalogoIdCatalogo":1,
  "id_carrinho":1,
  "ingressoId":1
}

---

.env

DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=senha12
DB_DATABASE=project_a3
DB_ENTITIES=dist/**/*.entity{.ts,.js}
DB_SYNCHRONIZE=true
JWT_SECRET=projetoa3





------------------------------------------------------------------------------------------------------------------------------------------------------------------------







<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
