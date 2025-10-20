

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {
   
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('abcdefghijkllk', 10)
    cy.get('#firstName').type("Walmir")
    cy.get('#lastName').type("Miranda")
    cy.get('#email').type("teste@teste.com")
    cy.get('#open-text-area').type(longText, {delay:5})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })
  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',() => {
      const longText = Cypress._.repeat('abcdefghijkllk', 10)
    cy.get('#firstName').type("Walmir")
    cy.get('#lastName').type("Miranda")
    cy.get('#email').type("teste@teste,com")
    cy.get('#open-text-area').type(longText, {delay:5})
    cy.contains('button', 'Enviar').click()
    
    cy.get('.error').should('be.visible')
  } )
 it('Valida campo telefone para aceitar somente números',() => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
    
  } )
   it('Valida que campo telefone é obrigatório',() => {

    cy.get('#firstName').type("Walmir")
    cy.get('#lastName').type("Miranda")
    cy.get('#email').type("teste@teste.com")
    cy.get('#open-text-area').type("Teste")
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()

     cy.get('.error').should('be.visible')
    
  } )
   it('Preenche e limpa os campos nome, sobrenome email e telefone', () => {

    cy.get('#firstName')
      .type("Walmir")
      .should('have.value', 'Walmir')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type("Miranda")
      .should('have.value','Miranda')
      .clear()
      .should('have.value','')
    cy.get('#email')
      .type("teste@teste.com")
      .should('have.value','teste@teste.com')
      .clear()
      .should('have.value','')
     cy.get('#phone')
      .type('12345678')
      .should('have.value', '12345678')
      .clear()
      .should('have.value', '')
    cy.get('#open-text-area').type("Teste")
    cy.get('#phone-checkbox').click()
    cy.contains('button', 'Enviar').click()

    } )
     it('Exibe mensagem de erro ao submeter formulário sem os campos obrigatórios',() => {
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
    
  } )
      it('Envia formulário com sucesso usando campos customizáveis',() => {
      
       cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should('be.visible')
    
  } )
  it('Seleciona um produto youtube por texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')

  })

  it('Seleciona um produto mentoria por seu valor (value)', () => {
  cy.get('#product')
      .select('mentoria')
      .should('have.value','mentoria')

  })
  it('Seleciona um produto Blog por seu indice', () =>{
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')

  })
  it('Marca o tipo de atendimento feedback', () =>{
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('be.checked')

  })
  it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeofService => {
        cy.wrap(typeofService)
          .check()
          .should('be.checked')
      })
    })
    it('Marca ambos checkboxes, depois desmarca o ultimo', () => {
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })
    it('Seleciona uma arquivo da pasta fixture', () =>{
      cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json')
        .should(input => {
          expect(input[0].files[0].name).to.equal('example.json')
        })
    })

       it('Seleciona um arquivo simulando um drag-and-drop', () =>{
      cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(input => {
          expect(input[0].files[0].name).to.equal('example.json')
        })
    })
  
        it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () =>{
          cy.fixture('example.json').as('sampleFile')
          cy.get('#file-upload')
            .selectFile('@sampleFile')
            .should(input => {
             expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    it('Verifica que a política de privacidade abre em outra aba se a necessidade de um clique', () => {
      cy.contains('a', 'Política de Privacidade')
        .should('have.attr', 'href', 'privacy.html')
        .and('have.attr', 'target', '_blank')
    })
    it('Acessa a página de política de privacidade removendo o target e então clicando no link', () => {
       cy.contains('a', 'Política de Privacidade')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    })
   

})