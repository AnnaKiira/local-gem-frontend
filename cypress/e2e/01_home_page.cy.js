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

    /* clickElementText('Sign Up')
    clickElementText('Sign In') */

  })

  it('fills out form and redirects', () => {

    //clicking on the sign up button - recirecting to form
    clickElementText('Sign Up')

    //asserting the sign up form is visible
    cy.get('.signup-form').should('be.visible')

    //asserting the h1 on form is visible
    cy.contains('h1', 'Sign Up').should('be.visible')

    checkFormFields('Email', 'input[name="email"]')
    checkFormFields('Username', 'input[name="username"]')
    checkFormFields('Password', 'input[name="hashedPassword"]')
    checkFormFields('Confirm Password', 'input[name="passwordConf"]')
    

  })

})

const clickElementText = (elementText) => { //helper function to assist on clicking on both Sign Up and Sign In
  cy.contains(elementText).click()
}

const checkFormFields = (labelText, textField) => { //helper function to assist in label and input fields are visible

  //if statement will check if a label is provided (and visible), it looks for a HTML 'label' element, and some labelText e.g. Email
  if (labelText) {
    cy.contains('label', labelText).should('be.visible')
  }

  //this get command asserts the input field is visible
  cy.get(textField).should('be.visible')
}