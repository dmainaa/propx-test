import { SEGMENTS } from "../../../support/routes/segments"
import { ROUTES } from "../../../support/routes/routes"
import creditNoteDate from "../../../fixtures/credit-note/credit_note_data.json"

const selectors = {
    creditNoteTitle: () => cy.get('h1').contains(creditNoteDate.creditNoteListTitle),
    creditNoteDescription: () => cy.get('p').contains(creditNoteDate.creditNoteListDescription),
    addCreditNoteButton: () => cy.get('main').find('button').first(),
    searchCreditNoteInput: () => cy.get('input').first(),
    filterCreditNoteInput: () => cy.get('main').find('button').eq(1),
}

class CreditNoteListPage {
    get creditNoteTitle() {
        return selectors.creditNoteTitle()
    }

    get creditNoteDescription() {
        return selectors.creditNoteDescription()
    }

    get addCreditNoteButton() {
        return selectors.addCreditNoteButton()
    }

    get searchCreditNoteInput() {
        return selectors.searchCreditNoteInput()
    }

    get filterButton() {
        return selectors.filterCreditNoteInput()
    }

    viewLandlordCreditNotes() {
        cy.loginAsSuperAdmin()
        cy.visit(ROUTES.app.child(SEGMENTS.APP.PROPERTYMANAGEMENT, SEGMENTS.APP.LEASEMANAGEMENT, SEGMENTS.LEASEMANAGEMENT.CREDITNOTES));
    }
}

export default new CreditNoteListPage()
