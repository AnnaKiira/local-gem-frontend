const BASE_URL = `http://localhost:3000`

describe('The homepage should load on every test', () => {

    beforeEach(() => {
        cy.log('I visit the BASE URL on every test')
        cy.visit('http://localhost:3000')
        cy.url().should('eq', "http://localhost:3000/")
    })

    it('clicks the sign in form, asserts visibility, fills form and logs in to your user profile', () => {

        //clicking on the sign in button - recirecting to form
        clickElementText('Sign In')

        //asserts the sign in form is visible once directed to the form
        cy.get('.signin-form').should('be.visible')

        //asserts the h1 with the text 'Log In' is visible
        cy.contains('h1', 'Log In').should('be.visible')

        //asserts labels e.g. Username and input fields are visible using a helper function (checkFormFields)
        checkFormFields('Username', 'input[name="username"]')
        checkFormFields('Password', 'input[name="hashedPassword"]')

        //fills in form fields with username and password to log in
        cy.get('input[name="username"]').type(Cypress.env('username'))
        cy.get('input[name="hashedPassword"]').type(Cypress.env('password'))

        //clicks on the log in button to get access
        cy.get('button[type="submit"]').click()

        cy.wait(3000)
        
        cy.get('.nav-link').contains('Sign Out').click() //signing out
        cy.url().should('include', BASE_URL) //assert im back on the homepage

    })

})

//helper function to assist on clicking on both Sign Up and Sign In
const clickElementText = (elementText) => {
    cy.contains(elementText).click()
}

//helper function to assist in label and input fields are visible
const checkFormFields = (labelText, textField) => {

    //if statement will check if a label is provided (and visible), it looks for a HTML 'label' element, and some labelText e.g. Username
    if (labelText) {
        cy.contains('label', labelText).should('be.visible')
    }

    //this get command asserts the input field is visible
    cy.get(textField).should('be.visible')
}