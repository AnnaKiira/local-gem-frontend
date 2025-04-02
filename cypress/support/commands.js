// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add('loginCommand', () => {
    cy.visit('/')
    cy.contains('Sign In').click()

    cy.get('.signin-form').should('be.visible')
    cy.get('input[name="username"]').type(Cypress.env('username'))
    cy.get('input[name="hashedPassword"]').type(Cypress.env('password'))
    cy.get('button[type="submit"]').click()

    cy.contains('Sign Out')
})

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })