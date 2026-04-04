import receiptData from '../../../fixtures/receipt/receipt_data.json'

const selectors = {
    receiptTitle: () => cy.get('h1').contains(receiptData.receiptListTitle),
    receiptDescription: () => cy.get('p').contains(receiptData.receiptListDescription),
    createreceiptButton: (buttonText) => cy.contains(`${receiptData.createButtonText}`).parent(),
    searchreceiptInput: () => cy.get(`input[type=text][placeholder="${receiptData.searchHintText}"]`),
    receiptsTable: () => cy.get('table'),
    tableHeaders: () => cy.getTableHeaders(),
    filterButton: () => cy.getListFilterButton()
}
