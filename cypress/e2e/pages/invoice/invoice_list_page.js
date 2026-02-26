
import { SEGMENTS } from "../../../support/routes/segments"
import { ROUTES } from "../../../support/routes/routes"
import invoiceData from "../../../fixtures/invoice/invoice_data.json"

const selectors = {
    invoiceTitle: () => cy.get('h1').contains(invoiceData.invoiceListTitle),
    invoiceDescription: () => cy.get('p').contains(invoiceData.invoiceListDescription),
    createInvoiceButton: (buttonText) => cy.contains('Create a invoice').parent(),
    searchInvoiceInput: () => cy.get('input[type=text][placeholder="Search invoices..."]'),
    invoicesTable: () => cy.get('table'),
    tableHeaders: () => cy.get('thead').find('tr')
}


class InvoiceListPage {

    get invoiceTitle() {return selectors.invoiceTitle()}
    get tableHeaders() {return selectors.tableHeaders()}
    get invoiceDescription() {return selectors.invoiceDescription()}
    get createInvoiceButton() {return selectors.createInvoiceButton()}
    get searchInvoiceInput() {return selectors.searchInvoiceInput()}
    get invoicesTable() {return selectors.invoicesTable()}

    viewLandlordInvoices() {
        cy.loginAsSuperAdmin()
        cy.visit(ROUTES.app.child(SEGMENTS.APP.PROPERTYMANAGEMENT, SEGMENTS.APP.LEASEMANAGEMENT, SEGMENTS.LEASEMANAGEMENT.INVOICES));
    }

    verifyTableHeaders() {
        this.tableHeaders.find('th').each(($th, index) => {
            cy.wrap($th).should('contain.text', invoiceData.tableHeaders[index])
        })
    }
}

export default new InvoiceListPage()