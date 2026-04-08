import receiptData from '../../../fixtures/receipt/receipt_data.json'
import { SEGMENTS } from '../../../support/routes/segments';
import { ROUTES } from '../../../support/routes/routes';
import { Receipt } from '../../../models/receipt';


const selectors = {
    transactionNumberInput: () => cy.getFormInputField(receiptData.formFieldHints[0]),
    transactionDateInput: () => cy.getFormButtonField(receiptData.formFieldHints[1]),
    payingUserInput: () => cy.getFormInputField(receiptData.formFieldHints[2]),
    receivingAccountInput: () => cy.getFormInputField(receiptData.formFieldHints[3]),
    paymentMethodInput: () => cy.getFormInputField(receiptData.formFieldHints[4]),
    amountInput: () => cy.getFormInputField(receiptData.formFieldHints[5]),
    currencyInput: () => cy.getFormInputField(receiptData.formFieldHints[6]),
    invoiceInput: () => cy.tableInput(0),
    allocationAmountInput: () => cy.tableInput(2),
    totalAllocatedText: () => cy.getValueComponentByLabel(receiptData.formFieldHints[7]),
    receiptAmountText: () => cy.getValueComponentByLabel(receiptData.formFieldHints[8]),
    balanceText: () => cy.getValueComponentByLabel(receiptData.formFieldHints[9]),
    addInvoiceButton: () => cy.contains('button', receiptData.createButtonText),
    cancelInvoiceButton: () => cy.contains('button', 'Cancel')
};

class CreateReceiptPage {
    get transactionNumberInput() { return selectors.transactionNumberInput().scrollIntoView(); }
    get transactionDateInput() { return selectors.transactionDateInput().scrollIntoView(); }
    get payingUserInput() { return selectors.payingUserInput().scrollIntoView(); }
    get receivingAccountInput() { return selectors.receivingAccountInput().scrollIntoView(); }
    get paymentMethodInput() { return selectors.paymentMethodInput().scrollIntoView(); }
    get currencyInput() { return selectors.currencyInput().scrollIntoView(); }
    get invoiceInput() { return selectors.invoiceInput().scrollIntoView(); }
    get allocatedAmountInput() { return selectors.allocationAmountInput().scrollIntoView(); }
    get totalAllocatedText() { return selectors.totalAllocatedText().scrollIntoView(); }
    get receiptAmountText() { return selectors.receiptAmountText().scrollIntoView(); }
    get balanceText() { return selectors.balanceText().scrollIntoView(); }
    get addInvoiceButton() { return selectors.addInvoiceButton().scrollIntoView(); }
    get cancelInvoiceButton() { return selectors.cancelInvoiceButton().scrollIntoView(); }
    get amountInput() { return selectors.amountInput().scrollIntoView(); }
    navigateToCreateReceipt() {
        cy.loginAsSuperAdmin()
        cy.visit(ROUTES.app.child(SEGMENTS.APP.PROPERTYMANAGEMENT, SEGMENTS.APP.LEASEMANAGEMENT, SEGMENTS.LEASEMANAGEMENT.RECEIPTS, SEGMENTS.CREATE));
    }

    fillTransactionNumber(transactionNumber) {
        this.transactionNumberInput.clear().type(transactionNumber)
    }

    fillReceiptAmount(amount) {
        this.amountInput.clear().type(amount)
    }

    selectTransactionDate() {
        this.transactionDateInput.click()
        cy.selectDate()
    }

    selectPayingUser() {
        this.payingUserInput.click()
        cy.selectDropdownItem()
    }

    selectReceivingAccount() {
        this.receivingAccountInput.click()
        cy.selectDropdownItem()
    }

    selectPaymentMethod() {
        this.paymentMethodInput.click()
        cy.selectDropdownItem()
    }

    selectCurrency() {
        this.currencyInput.click()
        cy.selectDropdownItem()
    }

    selectInvoice() {
        this.invoiceInput.click()
        cy.selectDropdownItem()
    }

    fillReceiptAllocationAmount(amount) {
        this.allocatedAmountInput.clear().type(amount)
    }

    createReceipt() {
        cy.intercept('GET', '**/invoices**').as('fetchInvoicesAPI')
        cy.intercept('POST', '**/receipts**').as('createReceiptAPI')
        this.fillTransactionNumber(Cypress.generateRandomString(10, 'alphabetic'))
        this.selectTransactionDate()
        this.selectPayingUser()
        return cy.wait('@fetchInvoicesAPI').then(({ response }) => {
            const amount = response.body.data[0].amount
            this.selectReceivingAccount()
            this.selectPaymentMethod()
            this.selectCurrency()
            this.selectInvoice()
            this.fillReceiptAmount(amount)
            this.fillReceiptAllocationAmount(amount / 2)
            this.addInvoiceButton.click()
            return cy.wait('@createReceiptAPI').then(({ response }) => {
                return cy.wrap(new Receipt(response.body.data.receipt))
            })
        })
    }

    fillReceiptForm({ transactionNumber, transactionDate, payingUser, receivingAccount, paymentMethod, currency, invoice, amount } = {}) {
        cy.intercept('POST', '**/receipts**').as('createReceiptAPI')
        if (transactionNumber) this.fillTransactionNumber(transactionNumber)
        if (transactionDate) this.selectTransactionDate()
        if (payingUser) this.selectPayingUser()
        if (receivingAccount) this.selectReceivingAccount()
        if (paymentMethod) this.selectPaymentMethod()
        if (currency) this.selectCurrency()
        if (invoice) this.selectInvoice()
        if (amount) this.fillReceiptAmount(amount)
        if (amount) this.fillReceiptAllocationAmount(amount / 2)
    }
}

export default new CreateReceiptPage()
