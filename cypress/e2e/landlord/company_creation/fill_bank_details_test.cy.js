describe('Fill Company Bank Details Test Suite', () => {
    let data
    before( function () {
        cy.fixture('example.json').then((userData) => {
            data = userData
        })
    } )
    

    beforeEach(() => {
        cy.login(data.companyCreationEmail, data.password)

        cy.url().should('include', '/onboarding/company')
        cy.fillCompanyPersonalInfoDetails()
        cy.fillCompanyServiceTypeDetails()
        cy.fillCompanyTaxDetails()

        cy.get('input[placeholder="Search and select bank..."]').scrollIntoView().as('bankNameInputField');
        cy.get('input[placeholder="Search and select branch..."]').scrollIntoView().as('branchInputField');
        cy.get('input[placeholder="Enter account name"]').scrollIntoView().as('accountNameInputField');
        cy.get('input[placeholder="Enter your account number"]').scrollIntoView().as('accountNumberInputField');
        cy.get('input[type="radio"][name="collection_contract"][value="true"]').scrollIntoView().as('collectionContractYesSelector');
        cy.get('input[type="radio"][name="collection_contract"][value="false"]').scrollIntoView().as('collectionContractNoSelector');

    })
    
    it('should verify all bank details elements are visible', () => {
        
        cy.get('@bankNameInputField').should('be.visible');
        cy.get('@branchInputField').should('be.visible');
        cy.get('@accountNameInputField').should('be.visible');
        cy.get('@accountNumberInputField').should('be.visible');
        cy.get('@collectionContractYesSelector').should('be.visible');
        cy.get('@collectionContractNoSelector').should('be.visible');
    })

    it('should enable next button when all required fields are filled', () => {

        cy.get('@bankNameInputField').click();
        cy.get('@bankNameInputField')
            .parent()
            .parent()
            .find('ul')
            .should('be.visible')
            .as('bankDropdownList');
        cy.get('@bankDropdownList').find('li').first().click();
        cy.get('@branchInputField').click();
        cy.get('@branchInputField')
            .parent()
            .parent()
            .find('ul')
            .should('be.visible')
            .as('branchDropdownList');

        cy.get('@branchDropdownList').find('li').first().click();
        cy.get('@accountNameInputField').type('Test Company Account');
        cy.get('@accountNumberInputField').type('1234567890');
        cy.get('@collectionContractYesSelector').click();
        cy.contains('Next').should('be.enabled');
    })
})