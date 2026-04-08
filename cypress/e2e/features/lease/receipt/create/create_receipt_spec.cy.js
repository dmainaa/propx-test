import createReceiptPage from "../../../../pages/receipt/create_receipt_page"
import receiptData from "../../../../../fixtures/receipt/receipt_data.json"

describe("Create Receipt Test Suite", () => {

    beforeEach(() => {
        createReceiptPage.navigateToCreateReceipt()
    })

    it("should display all form elements", () => {
        createReceiptPage.transactionNumberInput.should('be.visible')
        createReceiptPage.transactionDateInput.should('be.visible')
        createReceiptPage.payingUserInput.should('be.visible')
        createReceiptPage.receivingAccountInput.should('be.visible')
        createReceiptPage.paymentMethodInput.should('be.visible')
        createReceiptPage.currencyInput.should('be.visible')
        createReceiptPage.invoiceInput.should('be.visible')
        createReceiptPage.amountInput.should('be.visible')
        createReceiptPage.totalAllocatedText.should('be.visible')
        createReceiptPage.receiptAmountText.should('be.visible')
        createReceiptPage.balanceText.should('be.visible')
    })

    it("should display the create receipt button after all fields are filled", () => {
        createReceiptPage.fillReceiptForm({
            transactionNumber: receiptData.formFieldHints[0],
            transactionDate: true,
            payingUser: true,
            receivingAccount: true,
            paymentMethod: true,
            currency: true,
            invoice: true,
            amount: 200
        })

        createReceiptPage.addInvoiceButton.should('be.visible')
    })

    it('Verify that the receipt summary is correct', () => {

        createReceiptPage.fillReceiptForm({
            transactionNumber: receiptData.formFieldHints[0],
            transactionDate: true,
            payingUser: true,
            receivingAccount: true,
            paymentMethod: true,
            currency: true,
            invoice: true,
            amount: 200
        })

        createReceiptPage.receiptAmountText.invoke('text').then((receiptAmountText) => {
            createReceiptPage.totalAllocatedText.invoke('text').then((totalAllocatedText) => {
                createReceiptPage.balanceText.invoke('text').then((balanceText) => {
                    cy.parseFormattedAmount(receiptAmountText).then((receiptAmount) => {
                        cy.parseFormattedAmount(totalAllocatedText).then((totalAllocated) => {
                            cy.parseFormattedAmount(balanceText).then((balance) => {
                                expect(balance).to.eq(receiptAmount - totalAllocated)
                            })
                        })
                    })
                })
            })
        })
    })

    // it('Verify a receipt can be created successfully when all the items are filled', () => {
    //     createReceiptPage.createReceipt().then((receipt) => {
    //         expect(receipt.id).to.be.a('number')
    //         expect(receipt.amount).to.exist
    //         expect(receipt.transactionNumber).to.be.a('string')
    //     })
    // })
})
