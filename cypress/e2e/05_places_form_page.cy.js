const BASE_URL = `http://localhost:3000`

describe('The form page to create new post should load and display', () => {

    beforeEach(() => {
        cy.session('user-session', () => {
            cy.loginCommand()
        })

        cy.visit(`${BASE_URL}/places/new`)
    })

    it('asserts form, input fields and submit button are visible', () => {
        cy.get('.place-form').should('be.visible') //asserting the form is visible
        cy.get('h1').contains('Create Place').should('be.visible') //asserting the h1 Create Place is visible

        //asserting label and input fields are visible 
        checkFormFields('Name of Place', 'input[name="placeName"]')
        checkFormFields('Location', 'input[name="location"]')
        checkFormFields('Upload Image', 'input[name="image"]')
        checkFormFields('Description', 'textarea[name="description"]')

        cy.get('button').contains('SUBMIT').should('be.visible') //asserting the submit button is visible
    })

    it('fills form and create new post', () => { //filling in the form to create new post
        cy.get('input[name="placeName"]').type('Sanctuary of Christ the King')
        cy.get('input[name="location"]').type('Lisbon, Portugal')
        cy.get('input[name="image"]').selectFile('cypress/fixtures/jesus-statue.jpg')
        cy.get('textarea[name="description"]').type('Jesus Christ overlooking the city of Lisbon.')

        cy.wait(3000)
        cy.get('button[type="submit"]').click() //clicking the submit button
        cy.url().should('include', `${BASE_URL}/places`) //asserting we're back on the index page to see the added post
        cy.scrollTo('top') //scrolling to top since it redirects to the middle of the page and I want to see the newly added post 
    })

})

const checkFormFields = (labelText, textField) => {

    //if statement will check if a label is provided (and visible), it looks for a HTML 'label' element, and some labelText e.g. Location
    if (labelText) {
        cy.contains('label', labelText).should('be.visible')
    }

    //this get command asserts the input field is visible
    cy.get(textField).should('be.visible')
}