describe('E2E test | Sign In', () => {
    context('Sign In | Integrity Validation', function () {
        beforeEach(function () {
          cy.visit( Cypress.env( "e2e_url_login" ) + "?p=logout" )
          cy.clearCookies()
        })
        it('Presents a form with User name, Password, Button, and forgot Link.', () => {        
            cy.get('#login-form').should('be.visible')
            cy.get( "#login-form > div > div:nth-child(1) > div > div:nth-child(1) > input" ).should('be.visible')
            cy.get('[name=password]').should('be.visible')
            cy.get( "#login-form > div > div:nth-child(2) > button" ).should('be.visible')  //  Log in
            cy.get( "#login-form > div > div:nth-child(3) > div > span > a" ).should('be.visible')  //  Forgot password?
            cy.get( "#login-form > div > div:nth-child(3) > div > span > a" ).should(($link) => {
                expect($link.get(0).innerText).to.eq( 'Forgot password?' )
            });
        })
    
        it('Error if no credentials are entered (DOM form submit)', () => {
            cy.get('#login-form').submit()
            cy.get( "#landing-login > div:nth-child(2) > p.errors" ).should('be.visible')
            cy.url().should('include', 'login.')
            cy.screenshot()
        })

        it('Error if invalid credentials are entered (press enter key)', () => {
            cy.get( "#login-form > div > div:nth-child(1) > div > div:nth-child(1) > input" ).type( "dduck@disney.com" )
            cy.get('input[name=password]').type('Passw0rd1{enter}')
            cy.wait( 2000 )
            cy.get('#login-form').submit()
            cy.get( "#landing-login > div:nth-child(2) > p.errors" ).should('be.visible')
            cy.url().should('include', 'login.')
            cy.screenshot()
        })
    })
    context('Unauthorized Access | Routes', function () {
        it('Cannot access EVENTS unless Signed In', () => {
            cy.request({
                url: Cypress.env( "e2e_url_events" ),
                followRedirect: false,
              }).then((resp) => {
                expect(resp.status).to.eq(302)
                expect(resp.redirectedToUrl).to.include('login.')
              })
        })
        it('Cannot access PROFILE unless Signed In', () => {
            cy.request({
                url: Cypress.env( "e2e_url_profile" ),
                followRedirect: false,
              }).then((resp) => {
                expect(resp.status).to.eq(302)
                expect(resp.redirectedToUrl).to.include('login.')
              })
        })
    })
    context('Valid Credentials (DOM form submit) | Authenticated', function () {
        it('Success if valid credentials are entered (press enter key)', () => {
            cy.get( "#login-form > div > div:nth-child(1) > div > div:nth-child(1) > input" ).type( "{selectall}{backspace}" + Cypress.env( "mock_email" ) )
            cy.get('input[name=password]').type( "{selectall}{backspace}" + Cypress.env( "mock_password" ) )
            cy.wait( 1000 )
            cy.get('#login-form').submit()
            cy.wait( 1000 )
            cy.url().should('not.include', 'login.')
            Cypress.Cookies.debug(true, { verbose: false })
            cy.getCookie('logintoken').should('exist')
            cy.getCookie('role_id').should('exist')
            cy.getCookie('username').should('exist')
            cy.getCookie('otapi_token').should('exist')

            //  Evaluate SYSTEM.OUTPUT
            cy.window()
            .its("system.outpub.current_page")
            .should("not.equal", "")
            cy.screenshot()
        })
    })

    context('Sign Out | Authenticated', function () {
        it('Success if credentials are cleared', () => {
            
            cy.get( "#product-picker" ).click()
            cy.get( "#main-nav > div > div:nth-child(2) > div.dropdown.open > ul > li:nth-child(1) > a" ).click()
            cy.url().should('include', 'login.')
            Cypress.Cookies.debug(true, { verbose: false })
            cy.getCookie('logintoken').should('not.exist')
            cy.getCookie('role_id').should('not.exist')
            cy.getCookie('username').should('not.exist')
            cy.screenshot()
        })
    })
})