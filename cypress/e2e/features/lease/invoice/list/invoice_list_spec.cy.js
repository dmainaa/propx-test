
import invoiceListPage from "../../../../pages/invoice/invoice_list_page";
import { SEGMENTS } from "../../../../../support/routes/segments";
import invoiceData from "../../../../../fixtures/invoice/invoice_data.json"

describe('View Invoice Test Suite', () => {

    beforeEach(() => {
        invoiceListPage.viewLandlordInvoices()
    })

    it('Verify filter by property filters properly', () => {
        cy.intercept('GET', '**/invoices**').as('filterByPropertyAPI')
        invoiceListPage.filterButton.click()
        cy.getFilterComponent(invoiceData.filters[0]).click()
        cy.get('ul').find('li').first().click()
        cy.applyFiltersButton().click()
        cy.wait('@filterByPropertyAPI')
          .its('response.statusCode')
          .should('eq', 200)
    })
    
    it('Verify filter by statuses is working properly', () => {
        cy.intercept('GET', '**/invoices**').as('filterByStatusAPI')
        invoiceData.statusFilters.forEach((statusFilter) => {
            invoiceListPage.filterButton.click()
            cy.getFilterComponent('Status').click()
            cy.get('ul').find('li').contains(statusFilter).click()
            cy.applyFiltersButton().click()
            cy.wait('@filterByStatusAPI')
              .its('response.statusCode')
              .should('eq', 200)

        } )
    })

    it('Verify filter by date is working properly', () => {
        cy.intercept('GET', '**due_at**').as('filterByDateAPI')
        invoiceListPage.filterButton.click()
        cy.getFilterButtonComponent('Due Date').click()
        cy.selectDate()
        cy.applyFiltersButton().click()
        cy.wait('@filterByDateAPI').its(
            'response.statusCode'
        ).should('eq', 200)

    })

    it('Verify sort by invoice is working properly', () => {
        cy.intercept('GET', '**sort**').as('sortByInvoiceAPI')
        cy.wait(2000)
        cy.getColumnSortButton(invoiceData.invoiceListColumns[0]).click()
        cy.wait('@sortByInvoiceAPI').its('response.statusCode').should('eq', 200)

    })

    it('Verify sort by date is working properly', () => {
        cy.intercept('GET', '**sort**').as('sortByDateAPI')
        cy.wait(2000)
        cy.getColumnSortButton(invoiceData.invoiceListColumns[1]).click()
        cy.wait('@sortByDateAPI').its('response.statusCode').should('eq', 200)

    })

    it('Verify sort by total is working properly', () => {
        cy.intercept('GET', '**sort**').as('sortByTotalAPI')
        cy.wait(2000)
        cy.getColumnSortButton(invoiceData.invoiceListColumns[3]).click()
        cy.wait('@sortByTotalAPI').its('response.statusCode').should('eq', 200)

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

    it('Verify that the invoice list is populated', () => {
        cy.checkIfTableIsPopulated()
    })
})