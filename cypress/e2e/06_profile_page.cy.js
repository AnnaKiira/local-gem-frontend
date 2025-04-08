const BASE_URL = `http://localhost:3000`

describe('The profile is displayed', () => {

    beforeEach(() => {
        cy.session('user-session', () => {
            cy.loginCommand()
        })

        cy.visit(`${BASE_URL}/`)
    })

    it('asserts created posts are visible on profile page', () => {
        /* cy.get('h1').contains('Welcome {user.username}').should('be.visible') */
        cy.get('h2').contains('Your Places').should('be.visible')
        cy.get('p').should('not.have.value', 'You have not made any places yet.')
        cy.get('.place-card').should('be.visible')
        cy.get('.place-card').find('h2').should('be.visible')
        cy.get('header').find('p').should('be.visible')
        cy.get('.place-card').find('p').should('be.visible')
        cy.get('.upload-image').should('be.visible')
    })

    it('clicks on a post and assert all details are visible', () => {
        cy.get('.place-card').contains('Sanctuary of Christ the King').click()
        cy.scrollTo('top')
        cy.get('.place-details-container').should('be.visible')
        cy.get('.place-title').should('be.visible')
        cy.get('.post-details').should('be.visible')
        cy.get('.upload-image').should('be.visible')
        cy.get('.place-description').should('be.visible')
        cy.get('button').contains('Delete Place').should('be.visible')
        cy.get('a').contains('Update Place').should('be.visible')
        cy.get('h2').contains('Comments').should('be.visible')
        cy.get('p').contains('There are no comments.').should('be.visible')
        /* cy.get('.comment').contains('Your comment:').should('be.visible') */

        cy.get('textarea[name="text"]').should('be.visible')
        cy.get('button').contains('SUBMIT').should('be.visible')
    })

    it('edits the post, leaves a comment and deletes the post', () => {
        cy.get('.place-card').contains('Sanctuary of Christ the King').click()

        //editing post
        cy.get('a').contains('Update Place').click()
        cy.wait(2000) //has to find another solution to using the wait command
        cy.get('h1').contains('Update Place').should('be.visible')
        cy.get('input[name="placeName"]').clear().should('have.value', '').type('Christ the King')
        cy.get('textarea[name="description"]').clear().should('have.value', '').type('Visited on a sunny Saturday, it was beautiful.')

        cy.get('button[type="submit"]').click()
        cy.scrollTo('top')

        //comments
        cy.get('.comment-form').scrollIntoView()
        cy.get('textarea[name="text"]').type('I wanna go one day!')
        cy.get('button[type="submit"]').click()
        cy.get('.comment-card').should('be.visible')
        cy.get('.card-title').should('be.visible')
        cy.get('.card-text').should('be.visible')

        //deleting post
        cy.get('button').contains('Delete Place').scrollIntoView()
        cy.get('button').contains('Delete Place').click()


    })

})