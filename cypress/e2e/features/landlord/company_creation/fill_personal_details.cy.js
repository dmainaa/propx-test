
describe('Company Creation Flow Test Suite', () => {

    beforeEach(function() {
       

        cy.login('jasperthelandlord@gmail.com', 'Password')
        cy.url().should('include', '/onboarding/company')

        // Setup aliases for all form elements
        cy.get('input[placeholder="Enter your company name"]').as('companyNameInputField')
        cy.get('input[placeholder="Enter phone number"][inputmode="tel"]').as('phoneInputField')
        cy.get('input[placeholder="Enter your company address"]').as('companyAddressInputField')
        cy.get('label[aria-label="National ID"]').find('input[type="radio"]').as('nationalIdSelector')
        cy.get('label[aria-label="Business License"]').find('input[type="radio"]').as('businessLicenseSelector')
        cy.get('label[aria-label="Passport"]').find('input[type="radio"]').as('passportSelector')
        cy.get('input[placeholder="Enter registration number"]').as('registrationNumberInputField')
        cy.contains('Next').as('nextButton')
    })

    it('Verify all components are visible on the company creation page', () => {
        cy.get('@companyNameInputField').scrollIntoView().should('be.visible')
        cy.get('@phoneInputField').scrollIntoView().should('be.visible')
        cy.get('@companyAddressInputField').scrollIntoView().should('be.visible')
        cy.get('@nationalIdSelector').scrollIntoView().should('exist')
        cy.get('@businessLicenseSelector').scrollIntoView().should('exist')
        cy.get('@passportSelector').scrollIntoView().should('exist')
        cy.get('@registrationNumberInputField').scrollIntoView().should('be.visible')
        cy.get('@nextButton').scrollIntoView().should('be.visible')
    })

    it('Verify Next button is enabled when all fields are filled', () => {
        // Verify Next button is initially disabled
        cy.get('@nextButton').scrollIntoView().should('be.disabled')
        cy.get('@companyNameInputField').scrollIntoView().type('Test Company Ltd')
        cy.get('@phoneInputField').scrollIntoView().type('+254712345678')
        cy.get('@companyAddressInputField').scrollIntoView().type('123 Main Street, Nairobi')
        cy.get('@nationalIdSelector').scrollIntoView().click()
        cy.get('@registrationNumberInputField').scrollIntoView().type('12345678')
        cy.get('@nextButton').scrollIntoView().should('be.enabled')
    })
})