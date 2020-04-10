# GoStack 11 Rocketseat

Desafio da criação de uma aplicação backend utilizando os conceitos do Node.js aprendidos. Este projeto também conta com testes automatizados para cobrir os requisitos funcionais implementados.

------------

## Backend construído utilizando:

- [Node.js v.12.16.2](https://nodejs.org/)

- [Yarn v1.21.1](https://yarnpkg.com/)

- [Express](https://expressjs.com/) 

- [Uuidv4](https://www.npmjs.com/package/uuidv4)

- [Nodemon](https://www.npmjs.com/package/nodemon)

- [Jest](https://jestjs.io/)

- [Supertest](https://www.npmjs.com/package/supertest)

## Funcionalidades

Aplicação deve armazenar repositórios do seu portfólio. Deve permitir a criação, a listagem, a atualização e a remoção dos repositórios. Além disso deve permitir que os repositórios possam receber "likes".

### Rotas 

* **POST /repositories**: Rota que realiza a criação de um repositório; 

* **GET /repositories**: Rota que lista todos os repositórios; 

* **PUT /repositories/:id**: Rota para alterar apenas o *title*, a *url* e as *techs* de um repositório;

* **DELETE /**: Rota para deletar o repositório com o *id* presente nos parâmetros da rota;

* **POST /repositories/:id/like**: Rota para dar um like no repositório referente ao *id* presente nos parâmetros da rota.