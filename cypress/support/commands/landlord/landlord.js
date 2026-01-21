
Cypress.Commands.add('fillCompanyPersonalInfoDetails', (options = {}) => {
    const {
        companyName,
        phoneNumber,
        companyAddress,
        idType = 'nationalId',
        registrationNumber
    } = options

    // Validate ID type
    const validIdTypes = ['nationalId', 'businessLicense', 'passport']
    if (!validIdTypes.includes(idType)) {
        throw new Error(`Invalid idType. Must be one of: ${validIdTypes.join(', ')}`)
    }

    // Generate data if not provided
    const company = companyName || `${Cypress.generateRandomString(8, 'alphabetic')} Ltd`
    const phone = phoneNumber || Cypress.generateRandomPhone()
    const address = companyAddress || `${Cypress.generateRandomString(10, 'numeric')} ${Cypress.generateRandomString(8, 'alphabetic')} Street, Nairobi`
    const regNumber = registrationNumber || Cypress.generateRandomString(8, 'numeric')

    // Setup aliases
    cy.get('input[placeholder="Enter your company name"]').as('companyNameInputField')
    cy.get('input[placeholder="Enter phone number"][inputmode="tel"]').as('phoneInputField')
    cy.get('input[placeholder="Enter your company address"]').as('companyAddressInputField')
    cy.get('label[aria-label="National ID"]').find('input[type="radio"]').as('nationalIdSelector')
    cy.get('label[aria-label="Business License"]').find('input[type="radio"]').as('businessLicenseSelector')
    cy.get('label[aria-label="Passport"]').find('input[type="radio"]').as('passportSelector')
    cy.get('input[placeholder="Enter registration number"]').as('registrationNumberInputField')

    // Fill company name
    cy.get('@companyNameInputField').scrollIntoView().type(company)

    // Fill phone number
    cy.get('@phoneInputField').scrollIntoView().type(phone)

    // Fill company address
    cy.get('@companyAddressInputField').scrollIntoView().type(address)

    // Select ID type
    if (idType === 'nationalId') {
        cy.get('@nationalIdSelector').scrollIntoView().click()
    } else if (idType === 'businessLicense') {
        cy.get('@businessLicenseSelector').scrollIntoView().click()
    } else if (idType === 'passport') {
        cy.get('@passportSelector').scrollIntoView().click()
    }

    // Fill registration number
    cy.get('@registrationNumberInputField').scrollIntoView().type(regNumber)

    // Click Next button
    cy.contains('Next').scrollIntoView().click()
})

Cypress.Commands.add('fillCompanyServiceTypeDetails', (options = {}) => {
    const {
        serviceType = 'both',
        propertyTypes = [0]
    } = options

    // Validate service type
    const validServiceTypes = ['rent', 'sc', 'both']
    if (!validServiceTypes.includes(serviceType)) {
        throw new Error(`Invalid serviceType. Must be one of: ${validServiceTypes.join(', ')} (rent, sc, or both)`)
    }

    // Validate property types array
    if (!Array.isArray(propertyTypes) || propertyTypes.length === 0) {
        throw new Error('propertyTypes must be a non-empty array of indices')
    }

    // Setup aliases
    cy.get('input[type="radio"][value="rent"]').scrollIntoView().as('rentOnlySelector')
    cy.get('input[type="radio"][value="sc"]').scrollIntoView().as('serviceChargeOnlySelector')
    cy.get('input[type="radio"][value="both"]').scrollIntoView().as('serviceChargeRentSelector')

    // Select service type
    if (serviceType === 'rent') {
        cy.get('@rentOnlySelector').click()
    } else if (serviceType === 'sc') {
        cy.get('@serviceChargeOnlySelector').click()
    } else if (serviceType === 'both') {
        cy.get('@serviceChargeRentSelector').click()
    }

    // Select property types
    propertyTypes.forEach((index) => {
        cy.get('input[type="checkbox"]').eq(index).scrollIntoView().click()
    })

    // Click Next button
    cy.contains('Next').scrollIntoView().click()
})

Cypress.Commands.add('fillCompanyTaxDetails', (options = {}) => {
    const {
        hasVat = true,
        canChangeVat = true,
        country = 'Kenya',
        taxPin,
        withholdingTaxTypes = ['vat']
    } = options

    const pin = taxPin || `A${Cypress.generateRandomString(9, 'numeric')}B`
    const validWithholdingTypes = ['vat', 'labour', 'professional', 'rental']
    withholdingTaxTypes.forEach(type => {
        if (!validWithholdingTypes.includes(type.toLowerCase())) {
            throw new Error(`Invalid withholdingTaxType. Must be one of: ${validWithholdingTypes.join(', ')}`)
        }
    })
    cy.get('input[type="radio"][name="has_vat"][value="true"]').scrollIntoView().as('hasVatYesInputField')
    cy.get('input[type="radio"][name="has_vat"][value="false"]').scrollIntoView().as('hasVatNoInputField')
    cy.get('input[type="radio"][name="can_change_vat"][value="true"]').scrollIntoView().as('canChangeVatYesInputField')
    cy.get('input[type="radio"][name="can_change_vat"][value="false"]').scrollIntoView().as('canChangeVatNoInputField')
    cy.get('input[type="text"][placeholder="Kenya"]').scrollIntoView().as('countryInputField')
    cy.get('input[type="text"][placeholder="Enter your tax PIN"]').scrollIntoView().as('taxPinInputField')
    cy.get('span').contains('Vat').prev('div').find('input[type="checkbox"]').scrollIntoView().as('withholdingVatCheckbox')
    cy.get('span').contains('Labour').prev('div').find('input[type="checkbox"]').scrollIntoView().as('withholdingLabourCheckbox')
    cy.get('span').contains('Professional').prev('div').find('input[type="checkbox"]').scrollIntoView().as('withholdingProfessionalCheckbox')
    cy.get('span').contains('Rental').prev('div').find('input[type="checkbox"]').scrollIntoView().as('withholdingRentalCheckbox')

    // Select has VAT option
    if (hasVat) {
        cy.get('@hasVatYesInputField').click()
    } else {
        cy.get('@hasVatNoInputField').click()
    }

    // Select can change VAT option
    if (canChangeVat) {
        cy.get('@canChangeVatYesInputField').click()
    } else {
        cy.get('@canChangeVatNoInputField').click()
    }

    // Fill country
    cy.get('@countryInputField').clear().type(country)

    // Fill tax PIN
    cy.get('@taxPinInputField').type(pin)

    // Select withholding tax types
    withholdingTaxTypes.forEach(type => {
        const normalizedType = type.toLowerCase()
        if (normalizedType === 'vat') {
            cy.get('@withholdingVatCheckbox').check()
        } else if (normalizedType === 'labour') {
            cy.get('@withholdingLabourCheckbox').check()
        } else if (normalizedType === 'professional') {
            cy.get('@withholdingProfessionalCheckbox').check()
        } else if (normalizedType === 'rental') {
            cy.get('@withholdingRentalCheckbox').check()
        }
    })

    // Click Next button
    cy.contains('Next').scrollIntoView().click()
})
