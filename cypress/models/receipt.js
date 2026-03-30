/**
 * Receipt class to represent a receipt object returned by the API
 * Nested inside Payment
 */
import { Currency } from './currency'
import { Status } from './status'
import { DateField } from './date_field'

export class Receipt {
    constructor(data) {
        this.id = data.id
        this.currency = data.currency ? new Currency(data.currency) : null
        this.transactionNumber = data.transaction_number ?? null
        this.status = data.status ? new Status(data.status) : null
        this.createdAt = data.created_at ? new DateField(data.created_at) : null
    }

    toJSON() {
        return {
            id: this.id,
            currency: this.currency ? this.currency.toJSON() : null,
            transactionNumber: this.transactionNumber,
            status: this.status ? this.status.toJSON() : null,
            createdAt: this.createdAt ? this.createdAt.toJSON() : null
        }
    }
}
