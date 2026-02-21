describe('Fill Company Details Test Suite', () =>{
    let data;

    before(function () {
        cy.fixture('example.json').then((fixtureData) => {
            data = fixtureData;
        })
    })

    beforeEach(() => {
            cy.login(data.companyCreationEmail, data.password)
            cy.url().should('include', '/onboarding/company')
            cy.fillCompanyPersonalInfoDetails()
            cy.fillCompanyServiceTypeDetails()


            cy.get('input[type="radio"][name="has_vat"][value="true"]').scrollIntoView().as('hasVatYesInputField');
            cy.get('input[type="radio"][name="has_vat"][value="false"]').scrollIntoView().as('hasVatNoInputField');
            cy.get('input[type="radio"][name="can_change_vat"][value="true"]').scrollIntoView().as('canChangeVatYesInputField');
            cy.get('input[type="radio"][name="can_change_vat"][value="false"]').scrollIntoView().as('canChangeVatNoInputField');
            cy.get('input[type="text"][placeholder="Kenya"]').scrollIntoView().as('countryInputField');
            cy.get('input[type="text"][placeholder="Enter your tax PIN"]').scrollIntoView().as('taxPinInputField');
            cy.get('span').contains('Vat').prev('div').find('input[type="checkbox"]').scrollIntoView().as('withholdingVatCheckbox');
            cy.get('span').contains('Labour').prev('div').find('input[type="checkbox"]').scrollIntoView().as('withholdingLabourCheckbox');
            cy.get('span').contains('Professional').prev('div').find('input[type="checkbox"]').scrollIntoView().as('withholdingProfessionalCheckbox');
            cy.get('span').contains('Rental').prev('div').find('input[type="checkbox"]').scrollIntoView().as('withholdingRentalCheckbox');
            cy.getNextButton()
    })

    it('should verify all tax details elements are visible', () => {
        cy.get('@hasVatYesInputField').should('be.visible');
        cy.get('@hasVatNoInputField').should('be.visible');
        cy.get('@canChangeVatYesInputField').should('be.visible');
        cy.get('@canChangeVatNoInputField').should('be.visible');
        cy.get('@countryInputField').should('be.visible');
        cy.get('@taxPinInputField').should('be.visible');
        cy.get('@withholdingVatCheckbox').should('be.visible');
        cy.get('@withholdingLabourCheckbox').should('be.visible');
        cy.get('@withholdingProfessionalCheckbox').should('be.visible');
        cy.get('@withholdingRentalCheckbox').should('be.visible');
    })

    it('should enable next button when all required fields are filled', () => {
        cy.get('@hasVatYesInputField').click();
        cy.get('@canChangeVatYesInputField').click();
        cy.get('@countryInputField').clear().type('Kenya');
        cy.get('@taxPinInputField').type('A123456789B');
        cy.get('@withholdingVatCheckbox').check();

        cy.get('@nextButton').should('be.enabled');
    })
})