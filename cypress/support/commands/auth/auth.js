/**
 * Authentication-related custom commands
 */

Cypress.Commands.add('fillFirstName', (firstName) => {
    const name = firstName || Cypress.generateRandomString(8, 'alphabetic')
    cy.get('@firstNameInputField').type(name)
})

Cypress.Commands.add('fillLastName', (lastName) => {
    const name = lastName || Cypress.generateRandomString(10, 'alphabetic')
    cy.get('@lastNameInputField').type(name)
})

Cypress.Commands.add('fillPhoneNumber', (phoneNumber) => {
    const phone = phoneNumber || Cypress.generateRandomPhone()
    cy.get('@phoneInputField').type(phone)
})

Cypress.Commands.add('fillEmail', (email) => {
    const emailAddress = email || Cypress.generateRandomEmail()
    cy.get('@emailInputField').scrollIntoView().type(emailAddress)
})

Cypress.Commands.add('fillPassword', (password) => {
    const pwd = password || Cypress.generateRandomPassword()
    cy.get('@passwordInputField').scrollIntoView().type(pwd)
})


Cypress.Commands.add('fillConfirmPassword', (confirmPassword) => {
    const pwd = confirmPassword || Cypress.generateRandomPassword()
    cy.get('@confirmPasswordInputField').scrollIntoView().type(pwd)
})

Cypress.Commands.add('checkTermsCheckbox', () => {
    cy.get('@termsCheckBox').scrollIntoView().click()
})

Cypress.Commands.add('checkPrivacyPolicyCheckbox', () => {
    cy.get('@privacyPolicy').scrollIntoView().click()
})


Cypress.Commands.add('clickSubmit', () => {
    cy.get('@submitButton').scrollIntoView().click()
})

Cypress.Commands.add('login', (email, password) => {
    cy.fillEmail(email)
    cy.fillPassword(password)
    cy.clickSubmit()
})
