describe('E2E test | Hotel navigation, selection, and discovery', () => {
    context('Admin Add Hotel to Event', function () {
        Cypress.on('uncaught:exception', (err, runnable) => { return false }); // ignore CORS
        it('Success Login then Save Event', () => {
            cy.viewport(1066, 600)  //  large laptop 66.563em 
            cy.log( JSON.stringify(Cypress.env()) )
            let event_url;  //  The URL of the first event (default)
            let dMessage = new Date();  //  Now
            dMessage = dMessage.toDateString() + " " + dMessage.toLocaleTimeString();

            cy.tt_SignIn(Cypress.env( "mock_email" ), Cypress.env( "mock_password" ))
            .then(() => {
                cy.window().then( $win => {
                    cy.wrap( $win.system_output ).should("exist")
                })
            })
            cy.url().should('not.include', 'login.')
            cy.visit( Cypress.env( "e2e_url_events" ) )
            cy.url().should('include', 'events.')
            Cypress.Cookies.debug(true, { verbose: false })
            cy.getCookie('logintoken').should('exist')
            cy.getCookie('role_id').should('exist')
            cy.getCookie('username').should('exist')
            cy.getCookie('otapi_token').should('exist')
            cy.get("a[href*='event-edit']" ).first().click()  //  Find the first matching link in the table.
            cy.get("#messages" ).type("{selectall}{backspace}E2E Test: " + dMessage )
            cy.get("#eventForm > div.border-top.d-flex.pt-3.row > div > input" ).first().click()  //  Save change

            cy.get("#airTab" ).click()  //  select tab
            cy.get("#activate_flights" ).check();
            cy.get("#flightForm > div.border-top.d-flex.pt-3.row > div > input" ).click();           

            cy.get("#vehicleTab" ).click()  //  select tab
            cy.get("#activate_vehicle" ).uncheck();
            cy.get("#vehicleForm > div.border-top.d-flex.pt-3.row > div > input" ).click();   

            cy.get("#hotelTab" ).click()  //  select tab
            cy.get("#activate_hotels" ).check();
            cy.get("#hotelForm > div.border-top.d-flex.pt-3.row > div > input" ).click();   

            //  Extract URL from INPUT
            cy.get('#siteURL').invoke('val')
                .then( value => { event_url = value; });
            cy.then(() => { return cy.visit(event_url); });
        })
    })
    context('Choose Flight', function () {
        Cypress.on('uncaught:exception', (err, runnable) => { return false }); // ignore CORS
        it('Success Flight added to cart', () => {
            cy.viewport(1066, 600)  //  large laptop 66.563em 
            cy.get("#from_airport" ).type( "ORD" )
            cy.get("#to_airport" ).type( "LGA" )
            cy.get("input[name='from_date']" ).click({ force: true })

            cy.server()
            cy.route("*").as( "checkout" )

            cy.get("div.vdp-datepicker.flex-fill > div:nth-child(2) > div > span:nth-child(39)" ).first().click()
            cy.get("#search-widget-btn" ).click()
            cy.wait("@checkout" ).its('status').should('eq', 200)

            cy.get("h5.modal-title").should("not.be.visible")
                .then( ($ModalMsg) => {
                    cy.get("div.align-self-center.col-6.col-md.col-sm.col-xl.order-12.p-xs-1.text-right > button" ).first().click() 
                } )
        })
    })
    context('Hotel LightBox', function () {
        Cypress.on('uncaught:exception', (err, runnable) => { return false }); // ignore CORS
        it('Success Hotel added to cart', () => {
            cy.viewport(1066, 600)  //  large laptop 66.563em
            cy.wait(2000)
            cy.get("picture > img" ).first()
                .then( ( $picture )=>{
                    cy.wrap( $picture  ).click()
                    cy.wait( 6000 )
                })
            cy.get(".l-ltbx__image" ).first().click()  //  Cycle photos forward
            cy.get(".l-ltbx__vect--right" )
                .then( ( $arrow_right ) => {
                    cy.wait( 1000 )
                    cy.wrap( $arrow_right ).click()
                    cy.wait( 1000 )
                    cy.wrap( $arrow_right ).click()
                    cy.wait( 1000 )
                    cy.wrap( $arrow_right ).click()
            })
            cy.wait( 1000 )
            cy.get(".l-ltbx__btn" ).first()  //  Cycle photos backward
                .then( ( $arrow_left ) => {
                    cy.wrap( $arrow_left ).click()
                    cy.wait( 1000 )
                })
            cy.get(".l-ltbx__figcap").invoke("text").should("include", "4 of")
                .then( () => {
                    cy.get(".l-ltbx__vect" ).first().click()  //  Close Modal
                    cy.get("OUTPUT BUTTON.l-button" ).first().click()  //  Book Room
                        .then( () => {
                            cy.get( "A.ttfont-semibold.tttext-gray-700").first().click()  //  Change Tab
                            cy.wait( 1000 )
                            cy.get( "A.ttfont-semibold.tttext-gray-700").first().click()  //  Change Tab
                            cy.wait( 1000 )
                            cy.get( "ARTICLE SECTION BUTTON.l-button").first().click()  //  Book Room
                                .then( ()=>{
                                    cy.wait( 4000 )
                                    cy.url().should('include', '/checkout')
                                })
                        })
                })
        })
    })
})