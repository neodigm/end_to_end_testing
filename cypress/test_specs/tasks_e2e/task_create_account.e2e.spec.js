describe('LSC Create Accnt | Address | Credit Card | Prefs', () => {
    context('Create Account', function () {
        /*
create account
sign in

home page nav
    mega menu
    shop Catalogs
    search Personallized
        Add to wish list
    search collection
        Add to Cart

email offers
free Catalog
Catalog Quick Order Form
FAQ

Refer a Friend
PIO
Debug Page?
         */
        Cypress.on('uncaught:exception', (err, runnable) => { return false }); // ignore CORS
        it('Success Account Validated and Saved', () => {
            cy.viewport(1280, 720)  //  Surface Pro 
            cy.clearCookies()
            cy.log( JSON.stringify(Cypress.env()) )
            let dMessage = new Date();  //  Now
            dMessage = dMessage.toDateString() + " " + dMessage.toLocaleTimeString();

            cy.visit( Cypress.env("e2e_url_home") )
            .then(()=>{
                cy.wait( 2000 )
                cy.get("#js-topmenu__myaccount--id").click({ force: true })
                .then(()=>{
                    cy.wait( 2000 )
                    cy.get(".flymyaccount__btn--brand").first()
                    .then(($btn)=>{
                        cy.wrap($btn).click({ force: true })
                        cy.visit( Cypress.env("e2e_url_myaccount"))
                        cy.wait( 2000 )
                        cy.url().should('include', '/my_account/index.jsp')
                        .then(()=>{
                            cy.wait( 3000 )
                            cy.get(".reveal-modal-bg").first().click({ force: true }) // scrim
                            cy.wait( 4000 )
                            cy.get("#loginPer > section.create-new-acct.donotdisplay-cont.active > div > a").first().click({ force: true })
                            cy.wait( 4000 )
                            .then(()=>{
                                cy.get("#createaccont-fname").type("{selectall}{backspace}First")
                                cy.get("#createaccont-email").type("{selectall}{backspace}" + Cypress.env("mock_email"))
                                cy.get("#createaccont-confirmemail").type("{selectall}{backspace}" + Cypress.env("mock_email"))
                                cy.get("#createaccont-password").type("{selectall}{backspace}" + Cypress.env("mock_password"))
                                cy.get("#createaccont-confirmpassword").type("{selectall}{backspace}" + Cypress.env("mock_password")) //Word of Mouth
                                cy.wait( 2000 )
                                cy.get("#createNewAcct").click({ force: true })
                                .then(()=>{
                                    cy.wait( 5000 )
                                    it('Success if RED error message', () => {
                                        cy.get('#loginPer > section.create-new-acct.donotdisplay-cont.active.padding-top > small').should('be.visible')
                                    })
                                    cy.get("#createaccont-lname").type("{selectall}{backspace}Last")
                                    cy.get("#createNewAcct").click({ force: true })
                                    .then(()=>{
                                        Cypress.Cookies.debug(true, { verbose: false })
                                        cy.getCookie('utag_main').should('exist')
                                        cy.getCookie('JSESSIONID').should('exist')
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
    context('Sign Out', function () {
        Cypress.on('uncaught:exception', (err, runnable) => { return false }); // ignore CORS
        it('Success when user is logged out', () => {
            cy.viewport(1280, 720)  //  Surface Pro 
            cy.clearCookies()
            cy.get("#logoutTextLinkButtonMyAccount").click({ force: true })
            .then(()=>{

            })
        })
    })
})