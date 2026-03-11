it('testa a página da política de privacidade de forma independente', () => {
    cy.visit( './src/privacy.html')

    cy.get('#title')
      .contains('h1','CAC TAT - Política de Privacidade')
      .should('be.visible')
})

