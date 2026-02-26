
import invoiceListPage from "../../../../pages/invoice/invoice_list_page";
import { SEGMENTS } from "../../../../../support/routes/segments";

describe('View Invoice Test Suite', () => {
    let invoiceData

    before(() => {
        cy.fixture('invoice/invoice_data').then((data) => {
            invoiceData = data
        })
    })
    beforeEach(() => {
        invoiceListPage.viewLandlordInvoices()
    })
    it('Verify that relevant elements are visible', () => {
       invoiceListPage.invoiceTitle.should('be.visible')
       invoiceListPage.invoiceDescription.should('be.visible')
       invoiceListPage.createInvoiceButton.should('be.visible')
       invoiceListPage.searchInvoiceInput.should('be.visible') 
    })

    it('Verify when the create invoice button is clicked, the app redirects to create invoice page', () => {
        invoiceListPage.createInvoiceButton.click()
        cy.url().should('include', `${SEGMENTS.LEASEMANAGEMENT.INVOICES}/${SEGMENTS.CREATE}`)
    })

    it('Verify that the table headers are properly defined', () => {
        invoiceListPage.verifyTableHeaders()
    })

    it('Verify that the invoice list is populated', () => {
        cy.checkIfTableIsPopulated()
    })
})