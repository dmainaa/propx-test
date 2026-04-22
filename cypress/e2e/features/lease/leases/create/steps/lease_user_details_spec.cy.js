import leaseUserDetailsPage from "../../../../../pages/lease/create/user_details_page"

describe("Lease User Details Test Suite", () => {

    beforeEach(() => {
        leaseUserDetailsPage.navigateToLeaseUserDetailsPage()
    })

    it("should display the title, tenant dropdown and add tenant button", () => {
        leaseUserDetailsPage.titleText.should('be.visible')
        leaseUserDetailsPage.selectTenantInput.should('be.visible')
        leaseUserDetailsPage.addNewTenantButton.should('be.visible')
    })

    it("should display the new tenant form fields when add tenant button is clicked", () => {
        leaseUserDetailsPage.clickAddNewTenantButton()
        leaseUserDetailsPage.nameInputField.should('be.visible')
        leaseUserDetailsPage.emailInputField.should('be.visible')
        leaseUserDetailsPage.phoneInputField.should('be.visible')
        leaseUserDetailsPage.taxPinInputField.should('be.visible')
    })

    it("should show an error when next is clicked without selecting a tenant", () => {
        cy.getNextButton().click()
        leaseUserDetailsPage.getErrorText(0).should('be.visible')
    })

    it("should show field errors for each new tenant input when next is clicked without filling the form", () => {
        leaseUserDetailsPage.clickAddNewTenantButton()
        cy.getNextButton().click()
        leaseUserDetailsPage.getErrorText(1).should('be.visible')
        leaseUserDetailsPage.getErrorText(2).should('be.visible')
        leaseUserDetailsPage.getErrorText(3).should('be.visible')
        leaseUserDetailsPage.getErrorText(4).should('be.visible')
    })
})
