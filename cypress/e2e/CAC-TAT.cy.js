import { faker } from '@faker-js/faker'

describe('Central de Atendimento ao Cliente TAT', () => {

  const contato = {
    nome: faker.person.firstName(),
    sobrenome: faker.person.lastName(),
    email: faker.internet.email(),
    telefone: faker.string.numeric(10),
    comoPodemosAjudar: faker.lorem.sentences(2)
  }

  const textoLongo = Cypress._.repeat('teste com texto longo ', 12)

  beforeEach(() => {
    cy.visit('/src/index.html')
  })

  it('Verifica o título da aplicação', () => {

    cy.title().should('eq','Central de Atendimento ao Cliente TAT')
  })

  Cypress._.times(3, () => {
    it('preenche os campos obrigatórios e envia o formulário', () => {
      cy.clock() // "concela o tempo por três segundos"

      cy.get('#firstName').type(contato.nome)
      cy.get('#lastName').type(contato.sobrenome)
      cy.get('#email').type(contato.email)  
      cy.get('#open-text-area').type(contato.comoPodemosAjudar, { delay:0 })   

      cy.get('button[type="submit"]')
        .contains('Enviar')
        .click()

      cy.get('.success > strong')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')

      cy.tick(3000) // "avança em x milesegundos"

      cy.get('.success > strong')
        .should('not.be.visible')
    })    
  })

  it('Valida submeter o formulário com um email com formatação inválida', () => {
    cy.clock()

    cy.get('#firstName').type(contato.nome)
    cy.get('#lastName').type(contato.sobrenome)
    cy.get('#email').type('emailIncorreto')  
    cy.get('#open-text-area').type(textoLongo, { delay:0 }) //texto longo com repetição

    cy.get('button[type="submit"]')
      .contains('Enviar')
      .click()

    cy.get('.error > strong')
      .should('be.visible')
      
    cy.tick(3000)

    cy.get('.error > strong')
      .should('not.be.visible')
  })

  it('Campo telefone so aceita números', () => {
    cy.get('#phone')
      .type('xpto')
      .should('be.empty')
      //.should('have.value', '')
  })

  it('Valida telefone obrigatório mas não é preenchido ao enviar do formulário', () => {
    cy.clock()

    cy.get('#firstName').type(contato.nome)
    cy.get('#lastName').type(contato.sobrenome)
    cy.get('#email').type(contato.email)  
    cy.get('#open-text-area').type(contato.comoPodemosAjudar, { delay:0 }) 
    cy.get('#phone-checkbox').check()

    cy.contains('button[type="submit"]', 'Enviar')
      .click()

    cy.get('.error > strong')
      .should('be.visible') 
      .and('contain', 'Valide os campos obrigatórios!')

    cy.tick(3000)

    cy.get('.error > strong')
      .should('not.be.visible') 
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type(contato.nome)
      .should('have.value', contato.nome)
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type(contato.sobrenome)
      .should('have.value', contato.sobrenome)
      .clear()
      .should('be.empty')

    cy.get('#email')
      .type(contato.email)
      .should('have.value', contato.email)
      .clear()
      .should('have.value', '')
    
    cy.get('#phone')
      .type(contato.telefone)
      .should('have.value', contato.telefone)
      .clear()
      .should('be.empty')
  })

  it('Valida submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button[type="submit"]', 'Enviar')
      .click()

    cy.get('.error > strong')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
  })

  // usando comando com dados hard code
  it('Envia o formuário com sucesso usando um comando customizado', () => {  
    cy.preencheCamposObrigatoriosEenvia()

    cy.get('.success > strong')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
  })

  // usando comando e faker
  it('Envia o formulario com sucesso usando faker e comando customizado', () => {

    cy.preencherFormularioContatoEenvia(contato)

    cy.get('.success > strong')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
  })

  // usando comando e faker + padrão -> retire a chamada do objeto na função para chamar valores 
  // definidos como padrão no objeto do custom commands
  it('Envia o formulario com sucesso usando faker + padrao e comando customizado', () => {

    cy.preencherFormularioContatoEenviaPadrao()

    cy.get('.success > strong')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
  })

  it('seleciona um produto (YouTube) por seu texto',  () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value','youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('#support-type input[value="feedback"]')
      .as('checkFeedBack')
      .check()

    cy.get('@checkFeedBack')
      .should('be.checked')
      .and('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each((tipoAtendimento) => {
        cy.wrap(tipoAtendimento)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('#check input[type="checkbox"]')
      .as('checkboxes')
      .check()
      .should('be.checked')

    cy.get('@checkboxes')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should((arquivo) => {
        //console.log(arquivo)  //Navegando até a opção files do console é possível ver o arquivo
        //console.log(arquivo[0].files[0].name) //exibe o exatamente o arquivo do upload
        expect(arquivo[0].files[0].name).to.equal('example.json')
      })
  })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
      cy.get('#file-upload')
         .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
         .should((arquivo) => {
            expect(arquivo[0].files[0].name).to.equal('example.json')
          })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
      cy.fixture('example.json').as('arquivoUpload')
      cy.get('#file-upload')
        .selectFile('@arquivoUpload')
        .should((arquivo) => {
          expect(arquivo[0].files[0].name).to.equal('example.json')
        })
    })

    it('política de privacidade abre em outra aba sem clique', () => {
      cy.contains('a', 'Política de Privacidade')
        .should('have.attr', 'href', 'privacy.html')
         .and('have.attr', 'target','_blank')
    })

    it('acessa a página da política de privacidade removendo o target', () => {
      cy.contains('a', 'Política de Privacidade')
        .invoke('removeAttr', 'target')
        .click()

      cy.get('#title')
        .contains('h1','CAC TAT - Política de Privacidade')
        .should('be.visible')
    })

    it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
      cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })

    it('preenche o campo da área de texto usando o comando invoke.', () => {
      cy.get('#open-text-area')
        .as('inputTexto')
        .invoke('val', 'Inserindo texto simulando CTRL + V')

      cy.get('@inputTexto')
        .should('have.value', 'Inserindo texto simulando CTRL + V')
    })

    it('faz uma requisição HTTP', () => {
      cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
        .as('getRequest')
      
      cy.get('@getRequest')
        .its('status')
        .should('be.equal', 200)
      
      cy.get('@getRequest')
        .its('statusText')
        .should('be.equal', 'OK')

      cy.get('@getRequest')
        .its('body')
        .should('include', 'CAC TAT')

    })

    it('faz uma requisição HTTP de outra forma', () => {
      cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
        .as('getRequest')

      cy.get('@getRequest')
        .should(({status, statusText, body }) => {
          expect(status).to.equal(200)
          expect(statusText).to.equal('OK')
          expect(body).to.include('CAC TAT')
        })
    })

   it('encontra e mostra o gato escondido', () => {
    cy.get('#title')
      .invoke('text', 'CAT TAT')

    cy.get('#cat')
      .invoke('show')

    cy.get('#cat')
      .should('be.visible')
   })

})