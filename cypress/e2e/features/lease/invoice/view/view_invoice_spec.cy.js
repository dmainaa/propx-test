import viewInvoicePage from "../../../../pages/invoice/view_invoice_page";
import invoiceData from "../../../../../fixtures/invoice/invoice_data.json"

describe('View Invoice Test Suite', () => {
  

    beforeEach(() => {
        viewInvoicePage.navigateToViewInvoicePage()
    })

    it('Verify Invoice Title and Description are set', () => {
        viewInvoicePage.invoiceTitleText.should('not.be.empty')
    })

    it('Verify all predefined tabs are visible', () => {
        invoiceData.viewInvoiceTabs.forEach((tabName) => {
            cy.get('button[role=tab]').contains(tabName)
        })
    })

    it('Verify the Invoice Details Values are filled', () => {
       viewInvoicePage.checkInvoiceDetails()
    })

    it('Verify the Tenant Info Values are filled', () => {
       viewInvoicePage.checkTenantInforDetails()
    })

    it('Verify the Invoice Summary Values are filled', () => {
        viewInvoicePage.checkInvoiceSummaryDetails()
    })
})