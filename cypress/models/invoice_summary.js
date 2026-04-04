/**
 * InvoiceSummary class to represent a lightweight invoice object returned by the API
 * Used inside ReceiptAllocation to avoid circular dependencies with the full Invoice model
 */
import { Status } from './status'

export class InvoiceSummary {
    constructor(data) {
        this.id = data.id
        this.notes = data.notes ?? null
        this.total = data.total ?? null
        this.status = data.status ? new Status(data.status) : null
    }

    toJSON() {
        return {
            id: this.id,
            notes: this.notes,
            total: this.total,
            status: this.status ? this.status.toJSON() : null
        }
    }
}
