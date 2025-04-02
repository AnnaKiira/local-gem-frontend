
const BASE_URL = `http://localhost:3000`

describe('The index page should load and display all posts', () => {

    beforeEach(() => {
        cy.session('user-session', () => {
            cy.loginCommand()
        })

        cy.visit(`${BASE_URL}/places`)
        
    })

    

    it('asserts visibility', () => {

    })

})