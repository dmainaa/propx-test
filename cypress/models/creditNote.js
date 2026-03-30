/**
 * Credit class to represent a credit note object returned by the API
 * Nested inside Invoice as credits array
 */
import { Status } from './status'
import { DateField } from './date_field'

export class CreditNote {
    constructor(data) {
        this.id = data.id
        this.total = data.total
        this.status = data.status ? new Status(data.status) : null
        this.createdAt = data.created_at ? new DateField(data.created_at) : null
    }

    toJSON() {
        return {
            id: this.id,
            total: this.total,
            status: this.status ? this.status.toJSON() : null,
            createdAt: this.createdAt ? this.createdAt.toJSON() : null
        }
    }
}
