describe("Get more users", () => {
  it('Give me more', ()=> {
    cy.visit('/lion')

    cy.contains('Show more users').click()

    cy.contains('Show less users')
  })
})