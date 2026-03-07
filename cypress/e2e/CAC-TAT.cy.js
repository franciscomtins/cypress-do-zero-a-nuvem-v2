import { faker } from '@faker-js/faker'

describe('Central de Atendimento ao Cliente TAT', () => {

  const contato = {
    nome: faker.person.firstName(),
    sobrenome: faker.person.lastName(),
    email: faker.internet.email(),
    comoPodemosAjudar: faker.lorem.sentences(2)
  }

  beforeEach(() => {
    cy.visit('/src/index.html')
  })

  it('Verifica o título da aplicação', () => {

    cy.title().should('eq','Central de Atendimento ao Cliente TAT')
  })

  it('Preenche e envia formulário com campos obrigatórios', () => {
     cy.get('#firstName').type(contato.nome)
     cy.get('#lastName').type(contato.sobrenome)
     cy.get('#email').type(contato.email)  
     cy.get('#open-text-area').type(contato.comoPodemosAjudar)   

     cy.get('.button')
       .contains('Enviar')
       .click()

     cy.get('.success > strong')
       .should('be.visible', 'Mensagem enviada com sucesso.')
  })
  

})