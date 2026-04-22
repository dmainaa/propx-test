import userDetailsPage from '../../../../pages/lease/create/user_details_page'

describe('Lease Basic Details Test Suite', () => {

    beforeEach(() => {
        userDetailsPage.navigateToLeaseUserDetailsPage()
    })

    describe('Error Validations - Existing Tenant Form', () => {

        it('should show tenant required error when next is clicked without selecting a tenant', () => {
            cy.getNextButton().click()
            userDetailsPage.getErrorText(0).should('be.visible')
        })

    })

    describe('Error Validations - New Tenant Form', () => {

        beforeEach(() => {
            userDetailsPage.clickAddNewTenantButton()
        })

        it('should show name required error when next is clicked without filling name', () => {
            cy.getNextButton().click()
            userDetailsPage.getErrorText(1).should('be.visible')
        })

        it('should show email required error when next is clicked without filling email', () => {
            cy.getNextButton().click()
            userDetailsPage.getErrorText(2).should('be.visible')
        })

        it('should show phone required error when next is clicked without filling phone', () => {
            cy.getNextButton().click()
            userDetailsPage.getErrorText(3).should('be.visible')
        })

        it('should show ID Tax PIN required error when next is clicked without filling ID Tax PIN', () => {
            cy.getNextButton().click()
            userDetailsPage.getErrorText(4).should('be.visible')
        })

    })

})
