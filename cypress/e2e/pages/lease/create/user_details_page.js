
import userDetailsData from "../../../../fixtures/lease/create/lease_user_details_data.json"
import commonData from "../../../../fixtures/common.json"
import createLeasePage from "./create_lease_page"

const selectors = {
    titleText: () => cy.contains('h2', userDetailsData.title),
    selectTenantInput: () => cy.getFormInputField(userDetailsData.labels[0]),
    addNewTenantButton: () => cy.contains('button', userDetailsData.labels[1]),
    useExistingTenantButton: () => cy.contains('button', userDetailsData.labels[2]),
    nameInputField: () => cy.getFormInputField(commonData.name),
    emailInputField: () => cy.getFormInputField(commonData.email),
    phoneInputField: () => cy.getFormInputField(commonData.phone),
    taxPinInputField: () => cy.getFormInputField(commonData.idTaxPin),
    errorText: (text) => cy.contains(text),
}

class LeaseUserDetailsPage {

    get titleText() { return selectors.titleText().scrollIntoView() }
    get selectTenantInput() { return selectors.selectTenantInput().scrollIntoView() }
    get addNewTenantButton() { return selectors.addNewTenantButton().scrollIntoView() }
    get useExistingTenantButton() { return selectors.useExistingTenantButton().scrollIntoView() }
    get nameInputField() { return selectors.nameInputField().scrollIntoView() }
    get emailInputField() { return selectors.emailInputField().scrollIntoView() }
    get phoneInputField() { return selectors.phoneInputField().scrollIntoView() }
    get taxPinInputField() { return selectors.taxPinInputField().scrollIntoView() }

    getErrorText(index) { return selectors.errorText(userDetailsData.errorTexts[index]) }

    navigateToLeaseUserDetailsPage() {
        createLeasePage.navigateToCreateLeasePage()
    }

    selectExistingTenant() {
        this.selectTenantInput.click()
        cy.selectDropdownItem()
    }

    clickAddNewTenantButton() {
        this.addNewTenantButton.click()
    }

    clickUseExistingTenantButton() {
        this.useExistingTenantButton.click()
    }

    fillName(name) {
        this.nameInputField.clear().type(name)
    }

    fillEmail(email) {
        this.emailInputField.clear().type(email)
    }

    fillPhone(phone) {
        this.phoneInputField.clear().type(phone)
    }

    fillTaxPin(taxPin) {
        this.taxPinInputField.clear().type(taxPin)
    }

    fillBasicDetailsNewTenant() {
        this.clickAddNewTenantButton()
        this.fillName(Cypress.generateRandomString(8, 'alphabetic'))
        this.fillEmail(Cypress.generateRandomEmail())
        this.fillPhone(Cypress.generateRandomPhone())
        this.fillTaxPin(Cypress.generateRandomString(10, 'alphanumeric'))
    }

    fillBasicDetailsExistingTenant() {
        this.selectExistingTenant()
    }

    fillBasicDetails(newTenant) {
        if (newTenant) {
            this.fillBasicDetailsNewTenant()
        } else {
            this.fillBasicDetailsExistingTenant()
        }
    }

    fillUserDetails({ newTenant } = {}) {
        if (newTenant) {
            this.clickAddNewTenantButton()
            this.fillName(Cypress.generateRandomString(8, 'alphabetic'))
            this.fillEmail(Cypress.generateRandomEmail())
            this.fillPhone(Cypress.generateRandomPhone())
            this.fillTaxPin(Cypress.generateRandomString(10, 'alphanumeric'))
        } else {
            this.selectExistingTenant()
        }
    }
}

export default new LeaseUserDetailsPage()
