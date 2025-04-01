const BASE_URL = `http://localhost:3000`

describe('The homepage should load and should contain the correct contents', () => {
  
  beforeEach(() => {
    cy.log('I visit the BASE URL on every test')
    cy.visit('http://localhost:3000')
    cy.url().should('eq', "http://localhost:3000/")
  })

  it('loads and elements are visible and clickable', () => {
    
    //asserts the landing page container is visible
    cy.get('.landing-page').should('be.visible')

    //asserts the correct text in the container is visible too
    cy.contains('h1', 'Welcome to Local Gem').should('be.visible')
    cy.contains('h3', 'Sign up for a new account, and view all the cool Local Gems around town.').should('be.visible')

    //asserting the buttons and their contained text is visible
    cy.contains('button', 'Sign Up').should('be.visible')
    cy.contains('button', 'Sign In').should('be.visible')
  })

})