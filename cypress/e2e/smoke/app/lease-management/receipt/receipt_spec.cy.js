import receiptListPage from '../../../../pages/receipt/list_receipts_page';
import createReceiptPage from '../../../../pages/receipt/create_receipt_page';
import { SEGMENTS } from '../../../../../support/routes/segments';

describe('Receipt Smoke Test Suite', () => {

    it('allows user to view receipt list page successfully', () => {
        receiptListPage.viewLandlordReceipts()
        cy.checkIfTableIsPopulated(receiptListPage.receiptsTable)
    })

    it('allows user to create a receipt successfully', () => {
        receiptListPage.viewLandlordReceipts()
        receiptListPage.createReceiptButton.click()

        cy.url().should('include', `/${SEGMENTS.LEASEMANAGEMENT.RECEIPTS}/${SEGMENTS.CREATE}`)

        createReceiptPage.createReceipt().then((receipt) => {
            expect(receipt.id).to.be.a('number')
            expect(receipt.amount).to.exist
            expect(receipt.transactionNumber).to.be.a('string')
        })
    })
})
