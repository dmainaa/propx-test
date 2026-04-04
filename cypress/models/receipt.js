/**
 * Receipt class to represent a receipt object returned by the API
 * Maps the full show receipt API response: GET /receipts/:id
 */
import { Currency } from './currency'
import { Status } from './status'
import { DateField } from './date_field'
import { BankAccount } from './bank_account'
import { PaymentMethod } from './payment_method'
import { UserSummary } from './user_summary'
import { ReceiptAllocation } from './receipt_allocation'

export class Receipt {
    constructor(data) {
        this.id = data.id
        this.currency = data.currency ? new Currency(data.currency) : null
        this.transactionNumber = data.transaction_number ?? null
        this.receivingAccount = data.receiving_account ? new BankAccount(data.receiving_account) : null
        this.transactionDate = data.transaction_date ? new DateField(data.transaction_date) : null
        this.paymentMethod = data.payment_method ? new PaymentMethod(data.payment_method) : null
        this.payingUser = data.paying_user ? new UserSummary(data.paying_user) : null
        this.amount = data.amount ?? null
        this.allocated = data.allocated ?? null
        this.balance = data.balance ?? null
        this.receivingUser = data.receiving_user ? new UserSummary(data.receiving_user) : null
        this.status = data.status ? new Status(data.status) : null
        this.receiptAllocations = Array.isArray(data.receipt_allocations)
            ? data.receipt_allocations.map(allocation => new ReceiptAllocation(allocation))
            : []
        this.createdAt = data.created_at ? new DateField(data.created_at) : null
        this.disputedAt = data.disputed_at ? new DateField(data.disputed_at) : null
        this.disputeDetails = data.dispute_details ?? null
    }

    toJSON() {
        return {
            id: this.id,
            currency: this.currency ? this.currency.toJSON() : null,
            transactionNumber: this.transactionNumber,
            receivingAccount: this.receivingAccount ? this.receivingAccount.toJSON() : null,
            transactionDate: this.transactionDate ? this.transactionDate.toJSON() : null,
            paymentMethod: this.paymentMethod ? this.paymentMethod.toJSON() : null,
            payingUser: this.payingUser ? this.payingUser.toJSON() : null,
            amount: this.amount,
            allocated: this.allocated,
            balance: this.balance,
            receivingUser: this.receivingUser ? this.receivingUser.toJSON() : null,
            status: this.status ? this.status.toJSON() : null,
            receiptAllocations: this.receiptAllocations.map(allocation => allocation.toJSON()),
            createdAt: this.createdAt ? this.createdAt.toJSON() : null,
            disputedAt: this.disputedAt ? this.disputedAt.toJSON() : null,
            disputeDetails: this.disputeDetails
        }
    }
}
