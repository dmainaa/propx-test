/**
 * Payment class to represent a payment object returned by the API
 * Nested inside Invoice as payments array
 */
import { Receipt } from './receipt'
import { Status } from './status'
import { DateField } from './date_field'

export class Payment {
    constructor(data) {
        this.id = data.id
        this.receipt = data.receipt ? new Receipt(data.receipt) : null
        this.amount = data.amount
        this.status = data.status ? new Status(data.status) : null
        this.createdAt = data.created_at ? new DateField(data.created_at) : null
    }

    toJSON() {
        return {
            id: this.id,
            receipt: this.receipt ? this.receipt.toJSON() : null,
            amount: this.amount,
            status: this.status ? this.status.toJSON() : null,
            createdAt: this.createdAt ? this.createdAt.toJSON() : null
        }
    }
}
