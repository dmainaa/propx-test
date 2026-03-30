/**
 * LeaseItemComponent class to represent a lease item component object returned by the API
 * Nested inside InvoiceItem
 */
import { LeaseItem } from './lease_item'
import { LeaseComponent } from './lease_component'

export class LeaseItemComponent {
    constructor(data) {
        this.id = data.id
        this.leaseItem = data.lease_item ? new LeaseItem(data.lease_item) : null
        this.leaseComponent = data.lease_component ? new LeaseComponent(data.lease_component) : null
        this.costPerSqft = data.cost_per_sqft ?? null
        this.costPerMonth = data.cost_per_month ?? null
    }

    toJSON() {
        return {
            id: this.id,
            leaseItem: this.leaseItem ? this.leaseItem.toJSON() : null,
            leaseComponent: this.leaseComponent ? this.leaseComponent.toJSON() : null,
            costPerSqft: this.costPerSqft,
            costPerMonth: this.costPerMonth
        }
    }
}
