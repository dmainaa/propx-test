import createCreditNotePage from '../../../../pages/creditNote/create_creditnote_page';
import { ROUTES } from '../../../../../support/routes/routes';
import { SEGMENTS } from '../../../../../support/routes/segments';

describe('Create Credit Note Test Suite', () => {
  beforeEach(function () {
    cy.loginAsSuperAdmin();
    cy.visit(
      ROUTES.app.child(
        SEGMENTS.APP.PROPERTYMANAGEMENT,
        SEGMENTS.APP.LEASEMANAGEMENT,
        SEGMENTS.LEASEMANAGEMENT.CREDITNOTES,
        SEGMENTS.CREATE
      )
    );
  });

  // it('Verifies successful creation of a creditnote', () => {
  //   createCreditNotePage.createCreditNote().then((createdCreditNote) => {
  //     const creditNoteId = createdCreditNote?.id;

  //     expect(creditNoteId, 'created credit note id').to.not.be.null;
  //     expect(creditNoteId, 'created credit note id').to.not.be.undefined;

  //     cy.url().should('include', `${SEGMENTS.APP.CREDITNOTES}/${creditNoteId}`);
  //   });
  // });

  it('adds a new component item row when addComponentItemButton is clicked', () => {
    createCreditNotePage.searchAndSelectLease()
    createCreditNotePage.searchAndSelectInvoice()
    createCreditNotePage.fillCreditNoteItem()
    cy.get('table tbody tr').its('length').then((initialCount) => {
      cy.getTableAddItemComponentButton().click()
      cy.get('table tbody tr').its('length').should('be.greaterThan', initialCount);
    });
  });

  it('validates credit amount summary equals quantity * amount + 16% tax', () => {
    const quantity = 2;
    const amount = 100;
    const expectedCreditAmount = (quantity * amount) * 1.16;

    createCreditNotePage.selectDueDate();
    createCreditNotePage.searchAndSelectLease();
    createCreditNotePage.searchAndSelectInvoice();
    createCreditNotePage.fillQuantity(quantity);
    createCreditNotePage.fillAmount(amount);

    createCreditNotePage.creditAmountLabel
    .parent()
      .find('p')
      .eq(1)
      .invoke('text')
      .then((text) => {
        const uiValue = Number(text.replace(/[^0-9.-]/g, ''));
        const roundedUiValue = Math.round(uiValue * 100) / 100;
        const roundedExpectedCreditAmount = Math.round(expectedCreditAmount * 100) / 100;
        expect(roundedUiValue).to.equal(roundedExpectedCreditAmount);
      });
  });
});
