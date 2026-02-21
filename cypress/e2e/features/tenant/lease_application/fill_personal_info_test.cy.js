describe('Fill Personal Info Test Suite', () => {

    beforeEach(() => {

        cy.login('cypressNewTenant@gmail.com', 'Password')
        
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
    })

    it('should display all form fields and elements', () => {
        // Account type selectors
        cy.get('@personalAccountSelector').should('be.visible')
        cy.get('@businessAccountSelector').should('be.visible')

        // Personal information fields
        cy.get('@fullNameInputField').should('be.visible')
        cy.get('@emailInputField').should('be.visible')
        cy.get('@phoneInputField').should('be.visible')

        // Address fields - scroll into view
        cy.get('@countryDropDownSelector').scrollIntoView().should('be.visible')
        cy.get('@postalAddressInputField').scrollIntoView().should('be.visible')
        cy.get('@physicalAddressInputField').scrollIntoView().should('be.visible')

        // Registration and tax fields
        cy.get('@registrationNumberInputField').scrollIntoView().should('be.visible')
        cy.get('@taxPinInputField').scrollIntoView().should('be.visible')
        cy.get('@pinInputField').scrollIntoView().should('be.visible')

        // Action button
        cy.get('@nextButton').scrollIntoView().should('be.visible')
    })

    it('should enable Next button when all fields are filled', () => {
        // Fill all fields using custom command
        cy.fillTenantAccountForm({
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            phone: '0712345678',
            country: 'Kenya',
            postalAddress: '12345',
            physicalAddress: '123 Main Street, Nairobi',
            registrationNumber: 'REG123456',
            applicantTaxPin: 'A001234567B',
            taxPin: 'A001234567C'
        })

        // Verify Next button is enabled
        cy.get('@nextButton').scrollIntoView().should('be.visible').and('not.be.disabled')
    })

    it('should require full name field', () => {
        cy.get('@personalAccountSelector').check()
        cy.fillEmail('john.doe@example.com', cy.get('@emailInputField'))
        cy.fillPhone('0712345678')
        cy.fillCountry('Kenya')
        cy.fillPostalAddress('12345')
        cy.fillPhysicalAddress('123 Main Street, Nairobi')
        cy.fillRegistrationNumber('REG123456')
        cy.fillApplicantTaxPin('A001234567B')
        cy.fillTaxPin('A001234567C')

        // Verify Next button is disabled without full name
        cy.get('@nextButton').scrollIntoView().should('be.disabled')
    })

    it('should require email field', () => {
        cy.get('@personalAccountSelector').check()
        cy.fillFullName('John Doe')
        cy.fillPhone('0712345678')
        cy.fillCountry('Kenya')
        cy.fillPostalAddress('12345')
        cy.fillPhysicalAddress('123 Main Street, Nairobi')
        cy.fillRegistrationNumber('REG123456')
        cy.fillApplicantTaxPin('A001234567B')
        cy.fillTaxPin('A001234567C')

        // Verify Next button is disabled without email
        cy.get('@nextButton').scrollIntoView().should('be.disabled')
    })

    it('should require phone number field', () => {
        cy.get('@personalAccountSelector').check()
        cy.fillFullName('John Doe')
        cy.fillEmail('john.doe@example.com')
        cy.fillCountry('Kenya')
        cy.fillPostalAddress('12345')
        cy.fillPhysicalAddress('123 Main Street, Nairobi')
        cy.fillRegistrationNumber('REG123456')
        cy.fillApplicantTaxPin('A001234567B')
        cy.fillTaxPin('A001234567C')

        // Verify Next button is disabled without phone
        cy.get('@nextButton').scrollIntoView().should('be.disabled')
    })



    it('should require postal address field', () => {
        cy.get('@personalAccountSelector').check()
        cy.fillFullName('John Doe')
        cy.fillEmail('john.doe@example.com')
        cy.fillPhone('0712345678')
        cy.fillCountry('Kenya')
        cy.fillPhysicalAddress('123 Main Street, Nairobi')
        cy.fillRegistrationNumber('REG123456')
        cy.fillApplicantTaxPin('A001234567B')
        cy.fillTaxPin('A001234567C')

        // Verify Next button is disabled without postal address
        cy.get('@nextButton').scrollIntoView().should('be.disabled')
    })

    it('should require physical address field', () => {
        cy.get('@personalAccountSelector').check()
        cy.fillFullName('John Doe')
        cy.fillEmail('john.doe@example.com')
        cy.fillPhone('0712345678')
        cy.fillCountry('Kenya')
        cy.fillPostalAddress('12345')
        cy.fillRegistrationNumber('REG123456')
        cy.fillApplicantTaxPin('A001234567B')
        cy.fillTaxPin('A001234567C')

        // Verify Next button is disabled without physical address
        cy.get('@nextButton').scrollIntoView().should('be.disabled')
    })

    it('should require registration number field', () => {
        cy.get('@personalAccountSelector').check()
        cy.fillFullName('John Doe')
        cy.fillEmail('john.doe@example.com')
        cy.fillPhone('0712345678')
        cy.fillCountry('Kenya')
        cy.fillPostalAddress('12345')
        cy.fillPhysicalAddress('123 Main Street, Nairobi')
        cy.fillApplicantTaxPin('A001234567B')
        cy.fillTaxPin('A001234567C')

        // Verify Next button is disabled without registration number
        cy.get('@nextButton').scrollIntoView().should('be.disabled')
    })

    it('should require applicant tax PIN field', () => {
        cy.get('@personalAccountSelector').check()
        cy.fillFullName('John Doe')
        cy.fillEmail('john.doe@example.com')
        cy.fillPhone('0712345678')
        cy.fillCountry('Kenya')
        cy.fillPostalAddress('12345')
        cy.fillPhysicalAddress('123 Main Street, Nairobi')
        cy.fillRegistrationNumber('REG123456')
        cy.fillTaxPin('A001234567C')

        // Verify Next button is disabled without applicant tax PIN
        cy.get('@nextButton').scrollIntoView().should('be.disabled')
    })

    it('should require tax PIN field', () => {
        cy.get('@personalAccountSelector').check()
        cy.fillFullName('John Doe')
        cy.fillEmail('john.doe@example.com')
        cy.fillPhone('0712345678')
        cy.fillCountry('Kenya')
        cy.fillPostalAddress('12345')
        cy.fillPhysicalAddress('123 Main Street, Nairobi')
        cy.fillRegistrationNumber('REG123456')
        cy.fillApplicantTaxPin('A001234567B')

        // Verify Next button is disabled without tax PIN
        cy.get('@nextButton').scrollIntoView().should('be.disabled')
    })
})