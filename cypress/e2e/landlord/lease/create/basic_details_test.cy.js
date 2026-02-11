describe('Lease Basic Details Test Suite', () => {

    let userData

    before(() => {
        cy.fixture('userdata.json').then((data) => {
            userData = data
        })
    })

    beforeEach(() => {
        cy.login(userData.superAdminemail, userData.superAdminPassword);
        cy.wait(1000)
        cy.contains('Landlord').click()
        cy.navigateTo('http://localhost:3000/landlord/leases/create')

        // Tenant input field
        cy.contains('label', 'Tenant')
            .parent()
            .next()
            .find('input[placeholder="Select a tenant"]')
            .scrollIntoView()
            .as('tenantInputField');

        // Facility input field
        cy.contains('label', 'Facility')
            .parent()
            .next()
            .find('input[placeholder="Select a facility"]')
            .scrollIntoView()
            .as('facilityInputField');

        // Start Date selector (date button)
        cy.contains('label', 'Start Date')
            .parentsUntil('.flex-col')
            .parent()
            .find('button[aria-haspopup="dialog"]')
            .scrollIntoView()
            .as('startDateSelector');

        // Period (Years) input field
        cy.contains('label', 'Period (Years)')
            .parent()
            .parent()
            .siblings()
            .find('input[type="number"]')
            .first() // First input is "Years"
            .scrollIntoView()
            .as('periodYearsInputField');

        // Period (Months) input field
        cy.contains('label', 'Period (Months)')
            .parent()
            .parent()
            .siblings()
            .find('input[type="number"]')
            .scrollIntoView()
            .as('periodMonthsInputField');

        // Billing Cycle selector (button with role="combobox")
        cy.contains('label', 'Billing Cycle')
            .parent()
            .next()
            .find('button')
            .scrollIntoView()
            .as('billingCycleSelector');

        // Next Due Date selector (button)
        cy.contains('label', 'Next Due Date')
            .parentsUntil('.flex-col')
            .parent()
            .find('button[aria-haspopup="dialog"]')
            .scrollIntoView()
            .as('nextDueDateSelector');

        // Currency input field
        cy.contains('label', 'Currency')
            .parent()
            .next()
            .find('input[placeholder="Select currency"]')
            .scrollIntoView()
            .as('currencyInputField');

        // Status selector options (Active, Terminated, Suspended)
        cy.contains('label', 'Status')
            .parent()
            .next()
            .find('.flex.items-center:contains("Active")')
            .scrollIntoView()
            .as('activeStatusSelector');

        cy.contains('label', 'Status')
            .parent()
            .next()
            .find('.flex.items-center:contains("Terminated")')
            .scrollIntoView()
            .as('terminatedStatusSelector');

        cy.contains('label', 'Status')
            .parent()
            .next()
            .find('.flex.items-center:contains("Suspended")')
            .scrollIntoView()
            .as('suspendedStatusSelector');

    })

    it('should display all form elements', () => {
        // Verify form labels are visible
        cy.contains('label', 'Tenant').should('be.visible')
        cy.contains('label', 'Facility').should('be.visible')
        cy.contains('label', 'Start Date').should('be.visible')
        cy.contains('label', 'Period (Years)').should('be.visible')
        cy.contains('label', 'Period (Months)').should('be.visible')
        cy.contains('label', 'Billing Cycle').should('be.visible')
        cy.contains('label', 'Next Due Date').should('be.visible')
        cy.contains('label', 'Currency').should('be.visible')
        cy.contains('label', 'Status').should('be.visible')

        // Verify all form input fields are visible
        cy.get('@tenantInputField').should('be.visible')
        cy.get('@facilityInputField').should('be.visible')
        cy.get('@startDateSelector').should('be.visible')
        cy.get('@periodYearsInputField').should('be.visible')
        cy.get('@periodMonthsInputField').should('be.visible')
        // cy.get('@billingCycleSelector').should('be.visible')
        cy.get('@nextDueDateSelector').should('be.visible')
        cy.get('@currencyInputField').should('be.visible')

        // Verify status options are visible
        cy.get('@activeStatusSelector').should('be.visible')
        cy.get('@terminatedStatusSelector').should('be.visible')
        cy.get('@suspendedStatusSelector').should('be.visible')
    })


})