// comando com dados hard code
Cypress.Commands.add('preencheCamposObrigatoriosEenvia', () => {  
  cy.get('#firstName').type('primeiroNome')
  cy.get('#lastName').type('ultimoNome')
  cy.get('#email').type('meuemail@email.com')  
  cy.get('#open-text-area').type('campo de texto inserido', { delay:0 })   

  cy.get('button[type="submit"]')
    .contains('Enviar')
    .click()
})

// comando com dados gerados pela faker
Cypress.Commands.add('preencherFormularioContatoEenvia', (contato) => {
  cy.get('#firstName').type(contato.nome)
  cy.get('#lastName').type(contato.sobrenome)
  cy.get('#email').type(contato.email)
  cy.get('#phone').type(contato.telefone)
  cy.get('#open-text-area').type(contato.comoPodemosAjudar, { delay: 0 })

  cy.get('button[type="submit"]')
    .contains('Enviar')
    .click()
})

// comando com dados gerados pela faker + padrão 
Cypress.Commands.add('preencherFormularioContatoEenviaPadrao', (contato = {
    nome: 'PrimeiroNomePadrão',
    sobrenome: 'SobrenomePadrão',
    email: 'emailpadrao@email.com',
    telefone: 8533221199,
    comoPodemosAjudar: 'Texto padrão escrito'
}) => {
  cy.get('#firstName').type(contato.nome)
  cy.get('#lastName').type(contato.sobrenome)
  cy.get('#email').type(contato.email)
  cy.get('#phone').type(contato.telefone)
  cy.get('#open-text-area').type(contato.comoPodemosAjudar, { delay: 0 })

  cy.get('button[type="submit"]')
    .contains('Enviar')
    .click()
})