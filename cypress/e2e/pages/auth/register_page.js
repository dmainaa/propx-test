import { ROUTES } from '../../../support/routes/routes'
import { SEGMENTS } from '../../../support/routes/segments'

const selectors = {
    tenantPortalSelector: () => cy.get("label[aria-label='Tenant']").find('input[name="portal"][type="radio"]'),
    landlordPortalSelector: () => cy.get("label[aria-label='App']").find('input[name="portal"][type="radio"]'),
    agentPortalSelector: () => cy.get("label[aria-label='Agent']").find('input[name="portal"][type="radio"]'),
    firstNameInputField: () => cy.get("input[type='text'][placeholder='John']"),
    lastNameInputField: () => cy.get("input[type='text'][placeholder='Nogh']"),
    phoneInputField: () => cy.get("input[type='tel'][placeholder='Enter phone number']"),
    emailInputField: () => cy.get("input[type='email']"),
    passwordInputField: () => cy.get("input[type='password'][placeholder='Create a password']"),
    confirmPasswordInputField: () => cy.get("input[type='password'][placeholder='Confirm your password']"),
    termsCheckBox: () => cy.contains('I Agree To Terms & Conditions'),
    privacyPolicy: () => cy.contains('I Agree To Privacy Policy'),
    submitButton: () => cy.get('button[type="submit"]'),
}

class RegisterPage {

    get tenantPortalSelector() { return selectors.tenantPortalSelector() }
    get landlordPortalSelector() { return selectors.landlordPortalSelector() }
    get agentPortalSelector() { return selectors.agentPortalSelector() }
    get firstNameInputField() { return selectors.firstNameInputField() }
    get lastNameInputField() { return selectors.lastNameInputField() }
    get phoneInputField() { return selectors.phoneInputField() }
    get emailInputField() { return selectors.emailInputField() }
    get passwordInputField() { return selectors.passwordInputField() }
    get confirmPasswordInputField() { return selectors.confirmPasswordInputField() }
    get termsCheckBox() { return selectors.termsCheckBox() }
    get privacyPolicy() { return selectors.privacyPolicy() }
    get submitButton() { return selectors.submitButton() }

    visit() {
        cy.visit(ROUTES.auth.child(SEGMENTS.AUTH.REGISTER))
        cy.wait(2000)
    }

    fillFirstName(firstName) {
        const name = firstName || Cypress.generateRandomString(8, 'alphabetic')
        this.firstNameInputField.type(name)
    }

    fillLastName(lastName) {
        const name = lastName || Cypress.generateRandomString(10, 'alphabetic')
        this.lastNameInputField.type(name)
    }

    fillPhoneNumber(phoneNumber) {
        const phone = phoneNumber || Cypress.generateRandomPhone()
        this.phoneInputField.type(phone)
    }

    fillEmail(email) {
        const emailAddress = email || Cypress.generateRandomEmail()
        this.emailInputField.scrollIntoView().type(emailAddress)
    }

    fillPassword(password) {
        const pwd = password || Cypress.generateRandomPassword()
        this.passwordInputField.scrollIntoView().type(pwd)
    }

    fillConfirmPassword(confirmPassword) {
        const pwd = confirmPassword || Cypress.generateRandomPassword()
        this.confirmPasswordInputField.scrollIntoView().type(pwd)
    }

    checkTermsCheckbox() {
        this.termsCheckBox.scrollIntoView().click()
    }

    checkPrivacyPolicyCheckbox() {
        this.privacyPolicy.scrollIntoView().click()
    }

    clickSubmit() {
        this.submitButton.scrollIntoView().click()
    }

    registerUser(portalType, options = {}) {
        const validPortalTypes = ['tenant', 'landlord', 'agent']
        if (!portalType || !validPortalTypes.includes(portalType)) {
            throw new Error(`Invalid portalType. Must be one of: ${validPortalTypes.join(', ')}`)
        }

        const password = options.password || Cypress.generateRandomPassword(12)

        this.visit()

        const portalSelectors = {
            tenant: this.tenantPortalSelector,
            landlord: this.landlordPortalSelector,
            agent: this.agentPortalSelector,
        }
        portalSelectors[portalType].click()

        this.fillFirstName(options.firstName)
        this.fillLastName(options.lastName)
        this.fillPhoneNumber(options.phoneNumber)
        this.fillEmail(options.email)
        this.fillPassword(password)
        this.fillConfirmPassword(password)
        this.checkTermsCheckbox()
        this.checkPrivacyPolicyCheckbox()
        this.clickSubmit()
    }
}

export default new RegisterPage()
