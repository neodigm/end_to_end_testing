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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("tt_SignIn", (email, password)=>{
    cy.visit( Cypress.env( "e2e_url_login" ) + "?p=logout" )
    cy.clearCookies()
    cy.get("#login-form > div > div:nth-child(1) > div > div:nth-child(1) > input")
    .then( ($Email) => {
        cy.wrap( $Email ).type( email );
    } )
    .type( "{selectall}{backspace}" + email )
    cy.get("input[name=password]" ).type( "{selectall}{backspace}" + password )
    cy.get("#login-form").submit()
});
