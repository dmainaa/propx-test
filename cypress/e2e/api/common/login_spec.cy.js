describe('API Login Test Suite', () => {

    it('Verify successful login', () => {
        cy.loginUserViaApi(Cypress.env('adminUsername'), Cypress.env('adminPassword')).then(() => {
            expect(Cypress.env('token'), 'Token is saved successfully').to.not.be.null
        })
    })
})