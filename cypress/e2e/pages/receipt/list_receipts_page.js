import { SEGMENTS } from "../../../support/routes/segments"
import { ROUTES } from "../../../support/routes/routes"
import receiptData from "../../../fixtures/receipt/receipt_data.json"

const selectors = {
    receiptTitle: () => cy.get('h1').contains(receiptData.receiptListTitle),
    receiptDescription: () => cy.get('p').contains(receiptData.receiptListDescription),
    createReceiptButton: () => cy.contains(receiptData.createButtonText).parent(),
    searchReceiptInput: () => cy.get(`input[type=text][placeholder="${receiptData.searchHintText}"]`),
    receiptsTable: () => cy.get('table'),
    tableHeaders: () => cy.get('thead').find('tr'),
    filterButton: () => cy.get('main').find('button').eq(1),
}

class ReceiptListPage {

    get receiptTitle() { return selectors.receiptTitle() }
    get tableHeaders() { return selectors.tableHeaders() }
    get receiptDescription() { return selectors.receiptDescription() }
    get createReceiptButton() { return selectors.createReceiptButton() }
    get searchReceiptInput() { return selectors.searchReceiptInput() }
    get receiptsTable() { return selectors.receiptsTable() }
    get filterButton() { return selectors.filterButton() }

    viewLandlordReceipts() {
        cy.loginAsSuperAdmin()
        cy.visit(ROUTES.app.child(SEGMENTS.APP.PROPERTYMANAGEMENT, SEGMENTS.APP.LEASEMANAGEMENT, SEGMENTS.LEASEMANAGEMENT.RECEIPTS))
    }

    verifyTableHeaders() {
        this.tableHeaders.find('th').each(($th, index) => {
            if (index !== 0) {
                cy.wrap($th).find('span').contains(receiptData.receiptListColumns[index]).should('be.visible')
            }
        })
    }
}

export default new ReceiptListPage()
