/**
 * InvoiceItem class to represent an invoice item object returned by the API
 * Nested inside Invoice as invoice_items array
 */
import { LeaseItemComponent } from './lease_item_component'
import { TaxType } from './tax_type'
import { DateField } from './date_field'

export class InvoiceItem {
    constructor(data) {
        this.id = data.id
        this.leaseItemComponent = data.lease_item_component ? new LeaseItemComponent(data.lease_item_component) : null
        this.notes = data.notes ?? null
        this.quantity = data.quantity
        this.cost = data.cost
        this.amount = data.amount
        this.taxType = data.tax_type ? new TaxType(data.tax_type) : null
        this.tax = data.tax
        this.total = data.total
        this.paid = data.paid
        this.balance = data.balance
        this.createdAt = data.created_at ? new DateField(data.created_at) : null
    }

    toJSON() {
        return {
            id: this.id,
            leaseItemComponent: this.leaseItemComponent ? this.leaseItemComponent.toJSON() : null,
            notes: this.notes,
            quantity: this.quantity,
            cost: this.cost,
            amount: this.amount,
            taxType: this.taxType ? this.taxType.toJSON() : null,
            tax: this.tax,
            total: this.total,
            paid: this.paid,
            balance: this.balance,
            createdAt: this.createdAt ? this.createdAt.toJSON() : null
        }
    }
}
