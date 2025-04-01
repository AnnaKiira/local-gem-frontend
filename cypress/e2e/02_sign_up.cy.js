
const BASE_URL = `http://localhost:3000`

describe('The homepage should load on every test', () => {

    beforeEach(() => {
        cy.log('I visit the BASE URL on every test')
        cy.visit('http://localhost:3000')
        cy.url().should('eq', "http://localhost:3000/")
    })

    it('clicks the sign up form, asserts visibility, fills form and creates a user profile', () => {

        //clicking on the sign up button - recirecting to form
        clickElementText('Sign Up')

        //asserting the sign up form is visible
        cy.get('.signup-form').should('be.visible')

        //asserting the h1 with the text 'Sign Up' on form is visible
        cy.contains('h1', 'Sign Up').should('be.visible')

        //asserts labels e.g. Email and input fields are visible using a helper function (checkFormFields)
        checkFormFields('Email', 'input[name="email"]')
        checkFormFields('Username', 'input[name="username"]')
        checkFormFields('Password', 'input[name="hashedPassword"]')
        checkFormFields('Confirm Password', 'input[name="passwordConf"]')

        //fill in form fields with relevant user data
        cy.get('input[name="email"]').type(Cypress.env('email'))
        cy.get('input[name="username"]').type(Cypress.env('username'))
        cy.get('input[name="hashedPassword"]').type(Cypress.env('password'))
        cy.get('input[name="passwordConf"]').type(Cypress.env('password'))

        //clicking Sign Up button once form fields are filled in
        cy.get('button[type="submit"]').click()
    })

})

//helper function to assist on clicking on both Sign Up and Sign In
const clickElementText = (elementText) => {
    cy.contains(elementText).click()
}

//helper function to assist in label and input fields are visible
const checkFormFields = (labelText, textField) => {

    //if statement will check if a label is provided (and visible), it looks for a HTML 'label' element, and some labelText e.g. Email
    if (labelText) {
        cy.contains('label', labelText).should('be.visible')
    }

    //this get command asserts the input field is visible
    cy.get(textField).should('be.visible')
}