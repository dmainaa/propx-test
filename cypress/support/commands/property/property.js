
Cypress.Commands.add('navigateToViewProperty', (propertyId) => {
    
    const propId = propertyId || '1'
    cy.fixture('userdata.json').then((user) => {
        cy.login(user.superAdminemail, user.superAdminPassword)
        cy.contains('Landlord').click()
        cy.visit('http://localhost:5173/landlord/properties/' + propId)
    })
    
    
})