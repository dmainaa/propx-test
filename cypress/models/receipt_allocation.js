/**
 * ReceiptAllocation class to represent a receipt allocation object returned by the API
 * Nested inside Receipt as receipt_allocations array
 */
import { InvoiceSummary } from './invoice_summary'
import { Status } from './status'
import { DateField } from './date_field'

export class ReceiptAllocation {
    constructor(data) {
        this.id = data.id
        this.invoice = data.invoice ? new InvoiceSummary(data.invoice) : null
        this.amount = data.amount ?? null
        this.status = data.status ? new Status(data.status) : null
        this.createdAt = data.created_at ? new DateField(data.created_at) : null
    }

    toJSON() {
        return {
            id: this.id,
            invoice: this.invoice ? this.invoice.toJSON() : null,
            amount: this.amount,
            status: this.status ? this.status.toJSON() : null,
            createdAt: this.createdAt ? this.createdAt.toJSON() : null
        }
    }
}
