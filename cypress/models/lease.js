/**
 * Lease class to represent the lease object nested inside an Invoice API response
 */
import { Currency } from './currency'
import { DateField } from './date_field'

export class Lease {
    constructor(data) {
        this.id = data.id
        this.user = data.user ? new LeaseUser(data.user) : null
        this.currency = data.currency ? new Currency(data.currency) : null
        this.rentPerMonth = data.rent_per_month
        this.serviceChargePerMonth = data.service_charge_per_month
        this.nextDueAt = data.next_due_at ? new DateField(data.next_due_at) : null
    }

    toJSON() {
        return {
            id: this.id,
            user: this.user ? this.user.toJSON() : null,
            currency: this.currency ? this.currency.toJSON() : null,
            rentPerMonth: this.rentPerMonth,
            serviceChargePerMonth: this.serviceChargePerMonth,
            nextDueAt: this.nextDueAt ? this.nextDueAt.toJSON() : null
        }
    }
}

/**
 * LeaseUser class to represent the user object nested inside a Lease
 */
export class LeaseUser {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.profilePhotoUrl = data.profile_photo_url ?? null
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            profilePhotoUrl: this.profilePhotoUrl
        }
    }
}
