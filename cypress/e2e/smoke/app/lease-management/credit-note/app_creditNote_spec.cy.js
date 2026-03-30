import creditNoteListPage from '../../../../pages/creditNote/creditnote_list_page';
import createCreditNotePage from '../../../../pages/creditNote/create_creditnote_page';
import { SEGMENTS } from '../../../../../support/routes/segments';

describe('App Credit Note Smoke Test Suite', () => {
  it('allows user to view credit note list page successfully', () => {
    creditNoteListPage.viewLandlordCreditNotes();
    creditNoteListPage.creditNoteTitle.should('be.visible');
    creditNoteListPage.creditNoteDescription.should('be.visible');
  });

  it('allows user to create credit note successfully', () => {
    creditNoteListPage.viewLandlordCreditNotes();
    creditNoteListPage.addCreditNoteButton.click();

    cy.url().should('include', `/${SEGMENTS.LEASEMANAGEMENT.CREDITNOTES}/${SEGMENTS.CREATE}`);

    createCreditNotePage.createCreditNote().then((createdCreditNote) => {
      expect(createdCreditNote?.id, 'created credit note id').to.not.be.null;
      cy.url().should('include', `${SEGMENTS.APP.CREDITNOTES}/${createdCreditNote.id}`);
    });
  });
});
