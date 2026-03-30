/**
 * FacilitySpace class to represent a facility space object returned by the API
 * Nested inside LeaseItem
 */
export class FacilitySpace {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.size = data.size
        this.allocatedComponentsIds = data.allocated_components_ids ?? []
        this.facility = data.facility ?? null
        this.wing = data.wing ?? null
        this.type = data.type ?? null
        this.block = data.block ?? null
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            size: this.size,
            allocatedComponentsIds: this.allocatedComponentsIds,
            facility: this.facility,
            wing: this.wing,
            type: this.type,
            block: this.block
        }
    }
}
