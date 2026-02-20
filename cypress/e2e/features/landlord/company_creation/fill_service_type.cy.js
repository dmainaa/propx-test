describe('Fill Company Service Type Test Suite', () => {
    before(function() {
        cy.fixture('example').then(
            (data)=>{
                cy.login(data.companyCreationEmail, data.password)
                cy.url().should('include', '/onboarding/company')
                cy.fillCompanyPersonalInfoDetails()
            }
        )
    })

    beforeEach(() => {

        // Setup aliases for service type elements
        cy.get('input[type="radio"][value="rent"]').scrollIntoView().as('rentOnlySelector')
        cy.get('input[type="radio"][value="sc"]').scrollIntoView().as('serviceChargeOnlySelector')
        cy.get('input[type="radio"][value="both"]').scrollIntoView().as('serviceChargeRentSelector')
        cy.get('input[type="checkbox"]').first().scrollIntoView().as('firstPropertyTypeCheckbox')
        cy.get('input[type="checkbox"]').eq(1).scrollIntoView().as('secondPropertyTypeCheckbox')
        cy.contains('Next').scrollIntoView().as('nextButton')
    })

    it('Verify all service type elements are visible', () => {
        cy.get('@rentOnlySelector').should('exist')
        cy.get('@serviceChargeOnlySelector').should('exist')
        cy.get('@serviceChargeRentSelector').should('exist')
        cy.get('@firstPropertyTypeCheckbox').should('be.visible')
        cy.get('@secondPropertyTypeCheckbox').should('be.visible')
        cy.get('@nextButton').should('be.visible')
    })

    it('Verify Next button is enabled when all required fields are selected', () => {
        // Verify Next button is initially disabled
        cy.get('@nextButton').should('be.disabled')

        // Select a service type (radio button - one of rent, service charge, or both)
        cy.get('@serviceChargeRentSelector').click()

        // Select at least one property type (checkbox)
        cy.get('@firstPropertyTypeCheckbox').click()

        // Verify Next button is now enabled
        cy.get('@nextButton').should('be.enabled')
    })
})