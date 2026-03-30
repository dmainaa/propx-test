/**
 * LeaseItem class to represent a lease item object returned by the API
 * Nested inside LeaseItemComponent
 */
import { FacilitySpace } from './facility_space'
import { DateField } from './date_field'

export class LeaseItem {
    constructor(data) {
        this.id = data.id
        this.facilitySpace = data.facility_space ? new FacilitySpace(data.facility_space) : null
        this.createdAt = data.created_at ? new DateField(data.created_at) : null
    }

    toJSON() {
        return {
            id: this.id,
            facilitySpace: this.facilitySpace ? this.facilitySpace.toJSON() : null,
            createdAt: this.createdAt ? this.createdAt.toJSON() : null
        }
    }
}
