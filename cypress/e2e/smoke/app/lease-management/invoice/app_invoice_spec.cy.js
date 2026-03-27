import invoiceListPage from '../../../../pages/invoice/invoice_list_page';
import createInvoicePage from '../../../../pages/invoice/create_invoice_page';
import { SEGMENTS } from '../../../../../support/routes/segments';

describe('App Invoice Smoke Test Suite', () => {
  it('allows user to view invoice list page successfully', () => {
    invoiceListPage.viewLandlordInvoices();
    cy.checkIfTableIsPopulated(invoiceListPage.invoicesTable)

  });

  it('allows user to create invoice successfully', () => {
    invoiceListPage.viewLandlordInvoices();
    invoiceListPage.createInvoiceButton.click();

    cy.url().should('include', `/${SEGMENTS.LEASEMANAGEMENT.INVOICES}/${SEGMENTS.CREATE}`);

    cy.intercept('POST', '**/property-management/lease-management/invoices').as('createInvoiceRequest');

    createInvoicePage.createInvoice({
      notes: 'Smoke test invoice creation',
      item: { component: true, qty: 1, amount: 10000, tax: true },
    });

    cy.wait('@createInvoiceRequest').its('response.statusCode').should('be.oneOf', [200, 201]);
  });
});
