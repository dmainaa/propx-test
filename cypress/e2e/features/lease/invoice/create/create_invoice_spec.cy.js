import createInvoicePage from './create_invoice_page';
import { ROUTES } from '../../../../../support/routes/routes';
import { SEGMENTS } from '../../../../../support/routes/segments';

describe('Create Invoice Test Suite', () => {

  beforeEach(function () {
   cy.loginAsSuperAdmin()
   cy.visit(ROUTES.app.child(SEGMENTS.APP.PROPERTYMANAGEMENT, SEGMENTS.APP.LEASEMANAGEMENT, SEGMENTS.LEASEMANAGEMENT.INVOICES, SEGMENTS.CREATE));


  });

  it('verifies all form fields are visible', () => {
    createInvoicePage.dueDateButton.should('be.visible');
    createInvoicePage.selectLeaseInput.should('be.visible');
    createInvoicePage.invoiceNotes.should('be.visible');

    createInvoicePage.component.should('be.visible');
    createInvoicePage.itemNotes.should('be.visible');
    createInvoicePage.qty.should('be.visible');
    createInvoicePage.amount.should('be.visible');
    createInvoicePage.tax.should('be.visible');
  });

  it('fills in a complete invoice item', () => {
    createInvoicePage.selectDueDate('Mar 15, 2025');
    createInvoicePage.searchAndSelectLease('Lease #1001');
    createInvoicePage.fillInvoiceNotes('Monthly billing cycle');

    createInvoicePage.fillInvoiceItem({
      component: 'Rent',
      notes:     'April rent',
      qty:       '1',
      amount:    '25000',
      tax:       'VAT 16%',
    });
  });

  it('enables the Create Invoice button when all fields are filled', () => {
    createInvoicePage.addInvoiceButton.should('be.disabled');

    createInvoicePage.selectDueDate();
    createInvoicePage.searchAndSelectLease();
    createInvoicePage.fillInvoiceItem({ component: true, notes: 'Monthly billing cycle', qty: 1, amount: 29000, tax: 'VAT 16%' });

    createInvoicePage.addInvoiceButton.should('be.enabled');
  });

  it('redirects to the invoice view after successful creation', () => {
    cy.intercept('POST', '**/property-management/lease-management/invoices').as('createInvoiceRequest');

    createInvoicePage.createInvoice({
      notes: 'Monthly billing cycle',
      item:  { component: true, qty: 1, amount: 10000, tax: true },
    });

    cy.wait('@createInvoiceRequest').then(({ response }) => {
      const invoiceId = response.body.data.invoice.id;
      cy.url().should('include', `/invoices/${invoiceId}`);
    });
  });
});
