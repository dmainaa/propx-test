/**
 * LeaseComponent class to represent a lease component object returned by the API
 * e.g. { id: 1, name: "Rent" }
 */
export class LeaseComponent {
    constructor(data) {
        this.id = data.id
        this.name = data.name
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name
        }
    }
}
