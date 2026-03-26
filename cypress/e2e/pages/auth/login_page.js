import { ROUTES } from '../../../support/routes/routes'
import { SEGMENTS } from '../../../support/routes/segments'

const selectors = {
    emailInputField: () => cy.get('input[type="text"]'),
    passwordInputField: () => cy.get('input[type="password"]'),
    submitButton: () => cy.get('button[type="submit"]'),
}

class LoginPage {

    get emailInputField() { return selectors.emailInputField() }
    get passwordInputField() { return selectors.passwordInputField() }
    get submitButton() { return selectors.submitButton() }

    visit() {
        cy.visit(ROUTES.auth.child(SEGMENTS.AUTH.LOGIN))
    }

    fillEmail(email) {
        this.emailInputField.clear().type(email)
    }

    fillPassword(password) {
        this.passwordInputField.clear().type(password)
    }

    clickSubmit() {
        this.submitButton.scrollIntoView().click()
    }
}

export default new LoginPage()
