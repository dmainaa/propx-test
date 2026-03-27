import creditNoteListPage from "../../../../pages/creditNote/creditnote_list_page";
import { SEGMENTS } from "../../../../../support/routes/segments";
import creditNoteData from "../../../../../fixtures/credit-note/credit_note_data.json"

describe('View Credit Note Test Suite', () => {

    beforeEach(() => {
        creditNoteListPage.viewLandlordCreditNotes()
    })

    context('Filters and sorting', () => {
        it('Verify filter by property filters properly', () => {
            cy.intercept('GET', '**/credit-notes**').as('filterByPropertyAPI')
            creditNoteListPage.filterButton.click()
            cy.getFilterComponent(creditNoteData.filters[0]).click()
            cy.get('ul').find('li').first().click()
            cy.applyFiltersButton().click()
            cy.wait('@filterByPropertyAPI')
                .its('response.statusCode')
                .should('eq', 200)
        })

        it('Verify filter by statuses is working properly', () => {
            cy.intercept('GET', '**/credit-notes**').as('filterByStatusAPI')
            creditNoteData.statusFilters.forEach((statusFilter) => {
                creditNoteListPage.filterButton.click()
                cy.getFilterComponent('Status').click()
                cy.get('ul').find('li').contains(statusFilter).click()
                cy.applyFiltersButton().click()
                cy.wait('@filterByStatusAPI')
                    .its('response.statusCode')
                    .should('eq', 200)
            })
        })

        it('Verify filter by date is working properly', () => {
            cy.intercept('GET', '**due_at**').as('filterByDateAPI')
            creditNoteListPage.filterButton.click()
            cy.getFilterButtonComponent('Due Date').click()
            cy.selectDate()
            cy.applyFiltersButton().click()
            cy.wait('@filterByDateAPI')
                .its('response.statusCode')
                .should('eq', 200)
        })

        it('Verify sort by credit note is working properly', () => {
            cy.intercept('GET', '**sort**').as('sortByCreditNoteAPI')
            cy.wait(2000)
            cy.getColumnSortButton(creditNoteData.creditNoteListColumns[0]).click()
            cy.wait('@sortByCreditNoteAPI').its('response.statusCode').should('eq', 200)
        })

        it('Verify sort by date is working properly', () => {
            cy.intercept('GET', '**sort**').as('sortByDateAPI')
            cy.wait(2000)
            cy.getColumnSortButton(creditNoteData.creditNoteListColumns[1]).click()
            cy.wait('@sortByDateAPI').its('response.statusCode').should('eq', 200)
        })

        it('Verify sort by total is working properly', () => {
            cy.intercept('GET', '**sort**').as('sortByTotalAPI')
            cy.wait(2000)
            cy.getColumnSortButton(creditNoteData.creditNoteListColumns[3]).click()
            cy.wait('@sortByTotalAPI').its('response.statusCode').should('eq', 200)
        })
    })

    it('Verify that relevant elements are visible', () => {
        creditNoteListPage.creditNoteTitle.should('be.visible')
        creditNoteListPage.creditNoteDescription.should('be.visible')
        creditNoteListPage.addCreditNoteButton.should('be.visible')
        creditNoteListPage.searchCreditNoteInput.should('be.visible')
    })

    it('Verify when the add credit note button is clicked, the app redirects to create credit note page', () => {
        creditNoteListPage.addCreditNoteButton.click()
        cy.url().should('include', `${SEGMENTS.LEASEMANAGEMENT.CREDITNOTES}/${SEGMENTS.CREATE}`)
    })

    it('Verify that the credit note list is populated', () => {
        cy.checkIfTableIsPopulated()
    })
})
