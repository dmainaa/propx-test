describe('Property Information Test Suite', () => {

    beforeEach(() => {
        cy.navigateToViewProperty()

        cy.contains('.  text-base leading-[1.5rem] text-secondary-600/80 font-normal text-sm', 'Facility Type')
            .scrollIntoView()
            
            .as('facilityTypeLabel')

            cy.get('@facilityTypeLabel')
                .parent()
                .find('p')
                .eq(1)  
                .as('facilityLabelValue');

            cy.contains('.flex.justify-between.items-center', 'Construction Date')
            .scrollIntoView()

            .as('constructionDateLabel')

            cy.get('@constructionDateLabel')
                .parent()
                .find('p')
                .eq(1)  
                .as('constructionDateValue');

            cy.contains('.flex.justify-between.items-center', 'Location')
            .scrollIntoView()
            .as('locationLabel')

            cy.get('@locationLabel')
            .parent()
            .find('p')
            .eq(1)  
            .as('locationValue');

            cy.contains('.flex.justify-between.items-start', 'Description')
            .scrollIntoView()
            .as('descriptionLabel')

            cy.get('@descriptionLabel')
                .parent()
                .find('p')
                .eq(1)  
                .as('descriptionText');

            cy.get('div.flex.items-center.gap-2.px-2.py-1.bg-secondary-50.rounded')
            .contains('Has Blocks')
            .parent()
            .scrollIntoView()
            .as('hasBlocksLabel')

            cy.get('div.flex.items-center.gap-2.px-2.py-1.bg-secondary-50.rounded')
            .contains('Has Wings')
            .parent()
            .scrollIntoView()
            .as('hasWingsLabel')

    })

    it('Verify that all the property labels are visible', () => {
        cy.get('@facilityTypeLabel').should('be.visible')
        cy.get('@constructionDateLabel').should('be.visible')
        cy.get('@locationLabel').should('be.visible')
        cy.get('@descriptionLabel').should('be.visible')
        cy.get('@hasBlocksLabel').should('be.visible')
        cy.get('@hasWingsLabel').should('be.visible')
        
            
    })
})