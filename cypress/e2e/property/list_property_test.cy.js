

describe('List All Properties Test Suite', () => {
    let user
    before(() => {
        cy.fixture('userdata.json').then((fetchedData) => {
            user = fetchedData
        })
    })

    beforeEach(() => {
        cy.viewport(1280, 720) // Set desktop viewport to show sidebar
        cy.login(user.superAdminemail, user.superAdminPassword)
        cy.contains('Landlord').click()
        cy.initializeSideBar()
        cy.url().should('include', '/landlord')
        cy.contains('Property Management').scrollIntoView().click()
        cy.contains('All Properties').scrollIntoView().click()
       
    })

    it('Verify that the table is populated with properties', () => {

        cy.get('table').should('be.visible')
        cy.get('table tbody').find('tr').should('have.length.greaterThan', 1)
    })
    
    it('Verify the search functionality works', () => {
        cy.get('input[type="text"][placeholder="Search properties..."]').as('searchPropertyInputField')
        cy.get('@searchPropertyInputField').type(Cypress.generateRandomString())
        cy.contains('p', 'No properties found').should('be.visible')
    })
})
