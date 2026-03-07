import { faker } from '@faker-js/faker'

describe('Central de Atendimento ao Cliente TAT', () => {

  const contato = {
    nome: faker.person.firstName(),
    sobrenome: faker.person.lastName(),
    email: faker.internet.email(),
    comoPodemosAjudar: faker.lorem.sentences(2)
  }

  const textoLongo = Cypress._.repeat('teste com texto longo ', 12)

  beforeEach(() => {
    cy.visit('/src/index.html')
  })

  it('Verifica o título da aplicação', () => {

    cy.title().should('eq','Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
     cy.get('#firstName').type(contato.nome)
     cy.get('#lastName').type(contato.sobrenome)
     cy.get('#email').type(contato.email)  
     cy.get('#open-text-area').type(contato.comoPodemosAjudar, { delay:0 })   

     cy.get('button[type="submit"]')
       .contains('Enviar')
       .click()

     cy.get('.success > strong')
       .should('be.visible', 'Mensagem enviada com sucesso.')
  })

  it('Valida submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type(contato.nome)
    cy.get('#lastName').type(contato.sobrenome)
    cy.get('#email').type('emailIncorreto')  
    cy.get('#open-text-area').type(textoLongo, { delay:0 }) //texto longo com repetição

    cy.get('button[type="submit"]')
      .contains('Enviar')
      .click()

    cy.get('.error > strong')
      .should('be.visible', 'Valide os campos obrigatórios!')
  })

  it.only('Campo telefone so aceita números', () => {
    cy.get('#phone')
      .type('xpto')
      .should('be.empty')
      //.should('have.value', '')
  })



})