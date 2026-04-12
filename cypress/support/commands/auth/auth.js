import { ROUTES } from "../../routes/routes"
import { SEGMENTS } from "../../routes/segments"

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
    cy.visit(ROUTES.auth.child(SEGMENTS.AUTH.LOGIN))
    cy.get('input[type="text"][placeholder="you@example.com or +254712345678"]').as('emailInputField')
    cy.get('input[type="password"]').as('passwordInputField')
    cy.get('button[type="submit"]').as('submitButton')
    cy.get('@emailInputField').type(email)
    cy.get('@passwordInputField').type(password)

    cy.clickSubmit()
})

Cypress.Commands.add('loginAsSuperAdmin', () => {

        cy.visit(ROUTES.auth.child(SEGMENTS.AUTH.LOGIN))
        cy.get('input[type="text"][placeholder="you@example.com or +254712345678"]').as('emailInputField')
        cy.get('input[type="password"]').as('passwordInputField')
        cy.get('button[type="submit"]').as('submitButton')
        cy.get('@emailInputField').type(Cypress.env('adminUsername'))
        cy.get('@passwordInputField').type(Cypress.env('adminPassword'))
        cy.clickSubmit()
        cy.contains('Staff').click()
        cy.contains('Property Management').click()


})

Cypress.Commands.add('registerUser', (options = {}) => {
    const {
        portalType,
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        waitForApi = true,
        verifyRedirect = true
    } = options

    // Validate portal type
    const validPortalTypes = ['tenant', 'landlord', 'agent']
    if (!portalType || !validPortalTypes.includes(portalType)) {
        throw new Error(`Invalid portalType. Must be one of: ${validPortalTypes.join(', ')}`)
    }

    // Generate user data
    const userData = {
        firstName: firstName || Cypress.generateRandomString(8, 'alphabetic'),
        lastName: lastName || Cypress.generateRandomString(10, 'alphabetic'),
        phoneNumber: phoneNumber || Cypress.generateRandomPhone(),
        email: email || Cypress.generateRandomEmail(),
        password: password || Cypress.generateRandomPassword(12)
    }

    // Setup API intercept if needed
    if (waitForApi) {
        cy.intercept('POST', '**/auth/register').as('registerRequest')
    }

    // Navigate to register page
    cy.visit(ROUTES.auth.child(SEGMENTS.AUTH.REGISTER))

    // Setup aliases for form elements
    cy.get("label[aria-label='Tenant']").find('input[name="portal"][type="radio"]').as('tenantPortalSelector')
    cy.get("label[aria-label='Landlord']").find('input[name="portal"][type="radio"]').as('landlordPortalSelector')
    cy.get("label[aria-label='Agent']").find('input[name="portal"][type="radio"]').as('agentPortalSelector')
    cy.get("input[type='text'][placeholder='John']").as('firstNameInputField')
    cy.get("input[type='text'][placeholder='Nogh']").as('lastNameInputField')
    cy.get("input[type='tel'][placeholder='Enter phone number']").as('phoneInputField')
    cy.get("input[type='email']").as('emailInputField')
    cy.get("input[type='password'][placeholder='Create a password']").as('passwordInputField')
    cy.get("input[type='password'][placeholder='Confirm your password']").as('confirmPasswordInputField')
    cy.contains('I Agree To Terms & Conditions').as('termsCheckBox')
    cy.contains('I Agree To Privacy Policy').as('privacyPolicy')
    cy.get('button[type="submit"]').as('submitButton')

    // Select portal type
    if (portalType === 'tenant') {
        cy.get('@tenantPortalSelector').click()
    } else if (portalType === 'landlord') {
        cy.get('@landlordPortalSelector').click()
    } else if (portalType === 'agent') {
        cy.get('@agentPortalSelector').click()
    }

    // Fill form fields
    cy.fillFirstName(userData.firstName)
    cy.fillLastName(userData.lastName)
    cy.fillPhoneNumber(userData.phoneNumber)
    cy.fillEmail(userData.email)
    cy.fillPassword(userData.password)
    cy.fillConfirmPassword(userData.password)
    cy.checkTermsCheckbox()
    cy.checkPrivacyPolicyCheckbox()

    // Submit form
    cy.clickSubmit()

    // Wait for API response if enabled
    if (waitForApi) {
        cy.wait('@registerRequest').its('response.statusCode').should('eq', 200)
    }

    // Verify redirect if enabled
    if (verifyRedirect) {
        const redirectPaths = {
            tenant: appUrls.onboarding.leaseApplication,
            landlord: appUrls.onboarding.company,
            agent: appUrls.agent.companySwitch
        }
        cy.url().should('include', redirectPaths[portalType])
    }

    // Return user data for further use
    return cy.wrap(userData)
})
