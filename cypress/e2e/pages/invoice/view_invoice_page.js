import invoiceData from '../../../fixtures/invoice/invoice_data.json'


  const apiUrl = Cypress.env('apiUrl')
  const invoiceUrl = `${apiUrl}${Cypress.env('appApiUrl')}/property-management/lease-management/invoices?page=1&per_page=10`

const selectors = {
    invoiceTitleText: () => cy.get('.text-xl sm:text-2xl md:text-3xl font-bold break-all'),
    cancelInvoiceButton: () => cy.get('button').contains(invoiceData.cancelInvoiceButton),
    invoiceDetailsCard: () => cy.contains(invoiceData.invoiceDetailsCard.title).parent(),
    invoiceDetailsNotes: () => cy.get('h3').contains(invoiceData.invoiceDetailsCard.title).parent().find('p'),
    invoiceTabs: () => cy.get('div[role="tablist"]').scrollIntoView()

}

class ViewInvoicePage {
    
    get invoiceTitleText() {return selectors.invoiceTitleText()}
    get cancelInvoiceButton() {return selectors.cancelInvoiceButton()}
    get invoiceDetailsCard() {return selectors.invoiceDetailsCard()}
    get invoiceDetailsNotes() {return selectors.invoiceDetailsNotes()}
    get invoiceTabs() {return selectors.invoiceTabs()}

    navigateToViewInvoicePage() {
        console.log(invoiceUrl)
        cy.intercept('GET', 'https://propx-core.on-forge.com/api/v1/app/1/property-management/lease-management/invoices?page=1&per_page=10').as('invoiceListApi')
        cy.loginAsSuperAdmin()
        cy.visitInvoicesPage()
        cy.wait('@invoiceListApi')
        cy.get('tbody').find('tr').first().click()
    }

    checkInvoiceDetails() {
        cy.get('h3').contains(invoiceData.invoiceDetailsCard.title).should('be.visible')
        invoiceData.invoiceDetailsCard.labels.forEach((label) => {
            cy.checkCardLabelValue(cy.get('span').contains(label))
        })
        cy.get('h3').contains(invoiceData.invoiceDetailsCard.notesLabel).should('be.visible')
    }

    checkTenantInforDetails() {
        cy.get('h3').contains(invoiceData.tenantInfoCard.title).should('be.visible')
        invoiceData.tenantInfoCard.labels.forEach((label) => {
            cy.checkCardLabelValue(cy.get('span').contains(label))
        })
    }

    checkInvoiceSummaryDetails() {
        cy.get('h3').contains(invoiceData.invoiceSummaryCard.title).should('be.visible')
        invoiceData.invoiceSummaryCard.labels.forEach((label) => {
            cy.checkCardLabelValue(cy.get('span').contains(label))
        })
    }
}

export default new ViewInvoicePage()
