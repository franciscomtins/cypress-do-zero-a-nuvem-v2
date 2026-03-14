# 🌲 Cypress, do Zero à Nuvem ☁️

👋 Seja bem-vindo(a)!

Refazendo o treinamento básico na versão 2

## Vamos exercitar: 

- Como configurar um projeto Cypress do zero
- Como visitar páginas locais e remotas
- Como lidar com os elementos mais comuns encontrados em aplicações web
- Como testar upload de arquivos
- Como realizar as mais diversas verificações de resultados esperados
- Como criar comandos customizados
- Como lidar com links que abrem em outra aba do navegador
- Como rodar testes simulando as dimensões de um dispositivo móvel
- Como resolver os mesmos problemas de diferentes formas, conhecendo a [API do Cypress](https://docs.cypress.io/api/table-of-contents)
- Como criar uma documentação mínima para seu projeto de testes automatizados
- Como executar os testes em um _workflow_ de integração contínua sempre que mudanças ocorrerem no código da aplicação (ou dos testes)
- Como integrar seu _workflow_ de integração contínua com o Cypress Cloud (o serviço de gestão de testes do Cypress na nuvem)

## Pré-requisitos

> Todos na última versão LTS disponível.

- [Node.js](https://nodejs.org/) e npm
- [Cypress](https://www.cypress.io/) v15
- [@faker-js/faker](https://fakerjs.dev/) v10

## Instalação

```bash
npm install cypress --save-dev
npm install @faker-js/faker --save-dev
```

## Testes

| Comando | Descrição |
|---|---|
| `npm test` | Executa todos os testes em modo headless (desktop) |
| `npm run test:mobile` | Executa todos os testes em modo headless simulando viewport mobile (410x860) |
| `npm run cy:open` | Abre o Cypress Test Runner interativo (desktop) |
| `npm run cy:open:mobile` | Abre o Cypress Test Runner interativo simulando viewport mobile (410x860) |

___

Este é um curso da **Escola Talking About Testing**.
