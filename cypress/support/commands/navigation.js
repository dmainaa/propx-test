/**
 * Navigation-related custom commands
 */

/**
 * Navigate to the login page
 * @example cy.goToLogin()
 */
Cypress.Commands.add('goToLogin', () => {
    cy.visit('http://localhost:5173/auth/login')
    cy.get('input[type="text"][placeholder="you@example.com or +254712345678"]').as('emailInputField')
    cy.get('input[type="password"]').as('passwordInputField')
    cy.get('button[type="submit"]').as('submitButton')
})

Cypress.Commands.add('goToLeasePersonalInfoCompletion', (email, password) =>{
    let fillEmail = email ?? 'cypressNewTenant@gmail.com'
    let fillPassword = password ?? 'Password'

    cy.login(fillEmail, fillPassword)
        
    cy.get('input[value="personal"]').as('personalAccountSelector')
    cy.get('input[value="business"]').as('businessAccountSelector')
    cy.get('input[type="text"][placeholder="Enter your full name"]').as('fullNameInputField')
    cy.get('input[type="email"][placeholder="Enter email address"]').as('emailInputField')
    cy.get('input[type="tel"][placeholder="Enter phone number"]').as('phoneInputField')
    cy.get('input[type="text"][placeholder="Kenya"]').as('countryDropDownSelector')
    cy.get('input[type="text"][placeholder="Enter postal address"]').as('postalAddressInputField')
    cy.get('input[type="text"][placeholder="Enter physical address"]').as('physicalAddressInputField')
    cy.get('input[type="text"][placeholder="Enter registration number"]').as('registrationNumberInputField')
    cy.get('input[type="text"][placeholder="Enter applicant tax PIN"]').as('taxPinInputField')
    cy.get('input[type="text"][placeholder="Enter tax PIN"]').as('pinInputField')
    cy.contains("Next").as('nextButton')

    cy.fillLeasePersonalInfo({
        fullName: 'John Doe',
        email: fillEmail,
        phone: '0712345678',
        country: 'Kenya',
        postalAddress: '12345',
        physicalAddress: '123 Main Street, Nairobi',
        registrationNumber: 'REG123456',
        applicantTaxPin: 'A001234567B',
        taxPin: 'A001234567C'
    })
    
})



/**
 * Navigate to a specific page with optional query parameters
 * @param {string} path - The path to navigate to
 * @param {Object} queryParams - Optional query parameters
 * @example cy.navigateTo('/dashboard', { tab: 'profile' })
 */
Cypress.Commands.add('navigateTo', (path, queryParams = {}) => {
    const queryString = new URLSearchParams(queryParams).toString()
    const url = queryString ? `${path}?${queryString}` : path
    cy.visit(url)
})

/**
 * Verify the current URL includes a specific path
 * @param {string} path - The path to verify
 * @example cy.verifyUrlIncludes('/dashboard')
 */
Cypress.Commands.add('verifyUrlIncludes', (path) => {
    cy.url().should('include', path)
})

Cypress.Commands.add('getNextButton', () => {
    cy.get('button').contains('Next').scrollIntoView().as('nextButton')
})
