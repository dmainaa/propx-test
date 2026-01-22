describe('Upload Company Documents Test Suite', () => {
    let data

    before(function () {
        cy.fixture('example.json').then((fixtureData) => {
            data = fixtureData
        })
    })

    beforeEach(() => {
        cy.login(data.companyCreationEmail, data.password)
        cy.url().should('include', '/onboarding/company')
        cy.fillCompanyPersonalInfoDetails()
        cy.fillCompanyServiceTypeDetails()
        cy.fillCompanyTaxDetails()
        cy.fillCompanyBankDetails()

        cy.contains('label', 'Business License / Registration Certificate')
            .parent()
            .parent()
            .find('input[type="file"][accept=".pdf,.jpg,.jpeg,.png"]')
            .scrollIntoView()
            .as('businessLicenseUploadInputField');

        cy.contains('label', 'Tax PIN Certificate')
            .parent()
            .parent()
            .find('input[type="file"][accept=".pdf,.jpg,.jpeg,.png"]')
            .scrollIntoView()
            .as('taxPinCertificateUploadInputField');

        cy.contains('label', 'Other Relevant Documents')
            .parent()
            .parent()
            .find('input[type="file"][accept=".pdf,.jpg,.jpeg,.png"]')
            .scrollIntoView()
            .as('otherDocumentsUploadInputField');

        cy.getNextButton()
    })

    it('should verify all upload document elements are visible', () => {
        cy.get('@businessLicenseUploadInputField').should('exist');
        cy.get('@taxPinCertificateUploadInputField').should('exist');
        cy.get('@otherDocumentsUploadInputField').should('exist');
        cy.get('@nextButton').should('be.visible');
    })

    it('should enable next button when all documents are uploaded', () => {
        const fileName = 'bank-statement-08-21-17.png'
        cy.get('@businessLicenseUploadInputField').attachFile(fileName);
        cy.get('@taxPinCertificateUploadInputField').attachFile(fileName);
        cy.get('@otherDocumentsUploadInputField').attachFile(fileName);
        cy.get('@nextButton').should('be.enabled');
    })
})