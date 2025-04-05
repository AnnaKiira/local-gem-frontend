
const BASE_URL = `http://localhost:3000`

describe('The index page should load and display all posts', () => {

    beforeEach(() => {
        cy.session('user-session', () => {
            cy.loginCommand()
        })

        cy.visit(`${BASE_URL}/places`)
        
    })

    it('asserts the cards and their content is visible', () => {

        cy.get('.place-card').should('be.visible') //asserting each place card is visible

        cy.get('.place-card').find('h2').should('be.visible') //asserting the h2's are visible on the cards

        cy.get('header').find('p').should('be.visible') //asserting the p tag in the header section is visible

        cy.get('article').find('p').should('be.visible') //asserting the other paragraphs on the cards are visible

        cy.get('.place-card').find('.upload-image').should('be.visible') //asserting the image is visible
    })

})