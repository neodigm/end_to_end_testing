
# [Ground Breaking End to End Testing](https://neodigm.github.io/end_to_end_testing/)

Software Quality achieved through End to End testing, including responsive, API integration, visual regression, and smoke.

I've invested a few days into [aggressively exploiting](https://www.thescottkrause.com/tags/javascript/) this test runner to *stabilize and expand* test coverage. Test values persisted in the [Vuex Vue.js](https://www.thescottkrause.com/emerging_tech/curated-vue-typescript/) store.


<details>
  <summary>So far ...</summary>
    <ol>
      <li>Automatically capture a video when a test fails</li>
      <li>Apply optional configuration files via the command line. This will allow us to change environments easily (requires v3.6)</li>
      <li>Test globals like system_output</li>
      <li>Create custom reusable, and chainable commands, such as <strong>cy.signIn() or cy.turnOnFeature()</strong></li>
      <li>Test responsive layout behavior</li>
	<li>Infographics UX PWA Typescript Svelte ThreeJS Vue ✨</li>
      <ol>
</details>
<details>
  <summary>
    <p align="center">
      <img src="https://neodigm.github.io/vivid_vector_alphabet/wasm/vve.svg" width="44" alt="Renaissance Man Weaponeered">
      <img src="https://neodigm.github.io/vivid_vector_alphabet/wasm/vv2.svg" width="44" alt="Clockwork Clever Tricknology">
      <img src="https://neodigm.github.io/vivid_vector_alphabet/wasm/vve.svg" width="44" alt="DataVis 👁️ UX 🍭 PWA 👁️ ThreeJS ✨ Vue  🚀 Svelte 🌶️ htmlx">
    </p>
   </summary>
      <p align="center">
        <img src="https://neodigm.github.io/vivid_vector_alphabet/wasm/vvq.svg" width="44" alt="Clockwork Clever Tricknology">
        <img src="https://neodigm.github.io/vivid_vector_alphabet/wasm/vvu.svg" width="44" alt="Vector Skulduggery 🚀 Three.js 🚀 TypeScript 🍭 WASM ✨ Go">
        <img src="https://neodigm.github.io/vivid_vector_alphabet/wasm/vva.svg" width="44" alt="Clockwork Clever Tricknology">
        <img src="https://neodigm.github.io/vivid_vector_alphabet/wasm/vvl.svg" width="44" alt="Three.js 🚀 TypeScript 🚀 WASM ✨ Go">
        <img src="https://neodigm.github.io/vivid_vector_alphabet/wasm/vvi.svg" width="44" alt="Clockwork Clever Tricknology">
        <img src="https://neodigm.github.io/vivid_vector_alphabet/wasm/vvt.svg" width="44" alt="Vivid Vector Skulduggery">
        <img src="https://neodigm.github.io/vivid_vector_alphabet/wasm/vvy.svg" width="44" alt="Vivid Vector 🌑🌒🌓🌔🌕🌖🌗🌘🌑">
      </p>
Infographics UX PWA Typescript Svelte ThreeJS Vue ✨
✨ JavaScript && TypeScript && Go 🪐
</details>
      
```javascript
describe('E2E test | Hotel navigation, selection, and discovery', () => {
    context('Admin Add Hotel to Event', function () {
        Cypress.on('uncaught:exception', (err, runnable) => { return false }); // ignore CORS
        it('Success Login then Save Event', () => {
            cy.viewport(1066, 600)  //  large laptop 66.524em 
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
```

---
#
[Portfolio Blog](https://www.theScottKrause.com) |
[🌶️ Résumé](https://thescottkrause.com/Arcanus_Scott_C_Krause_2023.pdf) |
[UX micro-library](https://thescottkrause.com/emerging_tech/neodigm55_ux_library/) |
[PWA WASM](https://www.thescottkrause.com/emerging_tech/curated-pwa-links/) |
[Web Tool Toys](https://www.webtooltoys.com/) |
[Neodigm UX Wiki](https://github.com/arcanus55/neodigm55/wiki/Cheat-Sheet) | 
[NPM](https://www.npmjs.com/~neodigm) |
[Github](https://github.com/neodigm) |
[LinkedIn](https://www.linkedin.com/in/neodigm555/) |
[Gists](https://gist.github.com/neodigm?direction=asc&sort=created) |
[Salesforce](https://trailblazer.me/id/skrause) |
[Code Pen](https://codepen.io/neodigm24) |
[Machvive](https://www.machfivemarketing.com/accelerators/google_analytics_ga4_migration/) |
[Arcanus 55](https://www.arcanus55.com/?trusted55=A55PV2) |
[Medium](https://medium.com/@neo5ive/accessibility-%EF%B8%8F-ecommerce-552d4d35cd66) |
[W3C](https://www.w3.org/users/123844) |
[InfoSec](https://arcanus55.medium.com/offline-vs-cloud-password-managers-51b1fbebe301)
#
<p align="center">
	  <a target="_blank" href="https://www.thescottkrause.com/emerging_tech/cytoscape_dataviz_skills/">
	  	<img src="https://neodigm.github.io/brand_logo_graphic_design/fantastic/discerning/22.webp" alt="TypeScript UX 🪐 Interactive Infographic ⚡ WASM ✨ PWA 🍭 Svelte">
	  </a>
</p>

<p align="center">
  <a target="_blank" href="https://www.thescottkrause.com">
    <img src="https://neodigm.github.io/pan-fried-monkey-fisticuffs/thescottkrause_contact_card.png" title="UX PWA TypeScript ⚡ WASM ✨ Vue.js 🍭 ThreeJS 🌶️ HTMLX" alt="Interactive Infographic">
  </a>
</p>
