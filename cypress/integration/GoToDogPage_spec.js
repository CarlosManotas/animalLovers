describe("Go to the dog page", () => {
  it('Dog page', ()=> {
    cy.visit('/')

    cy.contains('dog').click()

    cy.location('pathname', {timeout: 10000})
      .should('include', '/dog');
  })
})