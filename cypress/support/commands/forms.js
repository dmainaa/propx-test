/**
 * Form-related custom commands
 */

/**
 * Fill a form field by label text
 * @param {string} label - The label text
 * @param {string} value - The value to enter
 * @example cy.fillFieldByLabel('Email', 'user@example.com')
 */
Cypress.Commands.add('fillFieldByLabel', (label, value) => {
    cy.contains('label', label)
        .invoke('attr', 'for')
        .then((id) => {
            cy.get(`#${id}`).type(value)
        })
})

/**
 * Verify that a form field has an error message
 * @param {string} errorMessage - The expected error message
 * @example cy.verifyErrorMessage('Email is required')
 */
Cypress.Commands.add('verifyErrorMessage', (errorMessage) => {
    cy.contains(errorMessage).should('be.visible')
})

/**
 * Clear all form fields in a container
 * @param {string} containerSelector - Optional container selector
 * @example cy.clearForm('.login-form')
 */
Cypress.Commands.add('clearForm', (containerSelector = 'form') => {
    cy.get(containerSelector).within(() => {
        cy.get('input').clear()
        cy.get('textarea').clear()
    })
})

/**
 * Fill full name field
 * @param {string} name - The full name
 * @param {Cypress.Chainable} selector - Optional custom selector
 * @example cy.fillFullName('John Doe')
 * @example cy.fillFullName('John Doe', cy.get('@fullNameInputField'))
 */
Cypress.Commands.add('fillFullName', (name, selector) => {
    if (selector != null) {
        selector.clear().type(name)
    } else {
        cy.get('input[type="text"][placeholder="Enter your full name"]').clear().type(name)
    }
})

/**
 * Fill email field
 * @param {string} email - The email address
 * @param {Cypress.Chainable} selector - Optional custom selector
 * @example cy.fillEmail('user@example.com')
 * @example cy.fillEmail('user@example.com', cy.get('@emailInputField'))
 */
Cypress.Commands.add('fillEmail', (email, selector) => {
    if (selector != null) {
        selector.clear().type(email)
    } else {
        cy.get('input[type="email"][placeholder="Enter email address"]').clear().type(email)
    }
})

/**
 * Fill phone number field
 * @param {string} phone - The phone number
 * @param {Cypress.Chainable} selector - Optional custom selector
 * @example cy.fillPhone('0712345678')
 * @example cy.fillPhone('0712345678', cy.get('@phoneInputField'))
 */
Cypress.Commands.add('fillPhone', (phone, selector) => {
    if (selector != null) {
        selector.clear().type(phone)
    } else {
        cy.get('input[type="tel"][placeholder="Enter phone number"]').clear().type(phone)
    }
})

/**
 * Fill country field
 * @param {string} country - The country name
 * @param {Cypress.Chainable} selector - Optional custom selector
 * @example cy.fillCountry('Kenya')
 * @example cy.fillCountry('Kenya', cy.get('@countryDropDownSelector'))
 */
Cypress.Commands.add('fillCountry', (country, selector) => {
    if (selector != null) {
        selector.scrollIntoView().clear().type(country)
    } else {
        cy.get('input[type="text"][placeholder="Kenya"]').scrollIntoView().clear().type(country)
    }
})

/**
 * Fill postal address field
 * @param {string} address - The postal address
 * @param {Cypress.Chainable} selector - Optional custom selector
 * @example cy.fillPostalAddress('12345')
 * @example cy.fillPostalAddress('12345', cy.get('@postalAddressInputField'))
 */
Cypress.Commands.add('fillPostalAddress', (address, selector) => {
    if (selector != null) {
        selector.scrollIntoView().clear().type(address)
    } else {
        cy.get('input[type="text"][placeholder="Enter postal address"]').scrollIntoView().clear().type(address)
    }
})

/**
 * Fill physical address field
 * @param {string} address - The physical address
 * @param {Cypress.Chainable} selector - Optional custom selector
 * @example cy.fillPhysicalAddress('123 Main Street')
 * @example cy.fillPhysicalAddress('123 Main Street', cy.get('@physicalAddressInputField'))
 */
Cypress.Commands.add('fillPhysicalAddress', (address, selector) => {
    if (selector != null) {
        selector.scrollIntoView().clear().type(address)
    } else {
        cy.get('input[type="text"][placeholder="Enter physical address"]').scrollIntoView().clear().type(address)
    }
})

/**
 * Fill registration number field
 * @param {string} regNumber - The registration number
 * @param {Cypress.Chainable} selector - Optional custom selector
 * @example cy.fillRegistrationNumber('REG123456')
 * @example cy.fillRegistrationNumber('REG123456', cy.get('@registrationNumberInputField'))
 */
Cypress.Commands.add('fillRegistrationNumber', (regNumber, selector) => {
    if (selector != null) {
        selector.scrollIntoView().clear().type(regNumber)
    } else {
        cy.get('input[type="text"][placeholder="Enter registration number"]').scrollIntoView().clear().type(regNumber)
    }
})

/**
 * Fill applicant tax PIN field
 * @param {string} taxPin - The applicant tax PIN
 * @param {Cypress.Chainable} selector - Optional custom selector
 * @example cy.fillApplicantTaxPin('A001234567B')
 * @example cy.fillApplicantTaxPin('A001234567B', cy.get('@taxPinInputField'))
 */
Cypress.Commands.add('fillApplicantTaxPin', (taxPin, selector) => {
    if (selector != null) {
        selector.scrollIntoView().clear().type(taxPin)
    } else {
        cy.get('input[type="text"][placeholder="Enter applicant tax PIN"]').scrollIntoView().clear().type(taxPin)
    }
})

/**
 * Fill tax PIN field
 * @param {string} taxPin - The tax PIN
 * @param {Cypress.Chainable} selector - Optional custom selector
 * @example cy.fillTaxPin('A001234567C')
 * @example cy.fillTaxPin('A001234567C', cy.get('@pinInputField'))
 */
Cypress.Commands.add('fillTaxPin', (taxPin, selector) => {
    if (selector != null) {
        selector.scrollIntoView().clear().type(taxPin)
    } else {
        cy.get('input[type="text"][placeholder="Enter tax PIN"]').scrollIntoView().clear().type(taxPin)
    }
})

/**
 * Fill all tenant account completion fields
 * @param {Object} data - Object containing all field values
 * @example cy.fillTenantAccountForm({ fullName: 'John Doe', email: 'john@example.com', ... })
 */
Cypress.Commands.add('fillTenantAccountForm', (data) => {
    cy.get('input[value="personal"]').check()
    cy.fillFullName(data.fullName)
    cy.fillEmail(data.email)
    cy.fillPhone(data.phone)
    cy.fillCountry(data.country)
    cy.fillPostalAddress(data.postalAddress)
    cy.fillPhysicalAddress(data.physicalAddress)
    cy.fillRegistrationNumber(data.registrationNumber)
    cy.fillApplicantTaxPin(data.applicantTaxPin)
    cy.fillTaxPin(data.taxPin)
})

/**
 * Fill all lease personal information fields and click Next button
 * @param {Object} data - Object containing all field values
 * @example cy.fillLeasePersonalInfo({ fullName: 'John Doe', email: 'john@example.com', phone: '0712345678', country: 'Kenya', postalAddress: '12345', physicalAddress: '123 Main Street, Nairobi', registrationNumber: 'REG123456', applicantTaxPin: 'A001234567B', taxPin: 'A001234567C' })
 */
Cypress.Commands.add('fillLeasePersonalInfo', (data) => {
    cy.get('input[value="personal"]').check()
    cy.fillFullName(data.fullName)
    cy.fillEmail(data.email)
    cy.fillPhone(data.phone)
    cy.fillCountry(data.country)
    cy.fillPostalAddress(data.postalAddress)
    cy.fillPhysicalAddress(data.physicalAddress)
    cy.fillRegistrationNumber(data.registrationNumber)
    cy.fillApplicantTaxPin(data.applicantTaxPin)
    cy.fillTaxPin(data.taxPin)
    cy.contains('Next').scrollIntoView().click()
})
