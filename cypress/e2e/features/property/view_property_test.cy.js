describe('View Property Test Suite', () => {

    let user

    before(function () {
        cy.fixture('userdata.json').then((data) => {
            user = data
        })
    })

    beforeEach(() => {
        cy.navigateToViewProperty()
    })


    it('Verify that property properties are filled', () => {
        // Facility Type text
            cy.contains('.flex.justify-between.items-center', 'Facility Type')
            .scrollIntoView()
            .find('p.font-semibold')
            .as('facilityTypeSelector').should('be.visible')

            // Construction Date text
            cy.contains('.flex.justify-between.items-center', 'Construction Date')
            .scrollIntoView()
            .find('p.font-semibold')
            .as('constructionDateSelector').should('be.visible')

            // Location text
            cy.contains('.flex.justify-between.items-center', 'Location')
            .scrollIntoView()
            .find('p.font-semibold')
            .as('locationSelector').should('be.visible')

            // Description text
            cy.contains('.flex.justify-between.items-start', 'Description')
            .scrollIntoView()
            .find('p.font-semibold')
            .as('descriptionSelector').should

            // Has Blocks label (badge)
            cy.get('div.flex.items-center.gap-2.px-2.py-1.bg-secondary-50.rounded')
            .contains('Has Blocks')
            .parent()
            .scrollIntoView()
            .as('hasBlocksSelector')

            // Has Wings label (badge)
            cy.get('div.flex.items-center.gap-2.px-2.py-1.bg-secondary-50.rounded')
            .contains('Has Wings')
            .parent()
            .scrollIntoView()
            .as('hasWingsSelector')

    })
})