/**
 * Currency class to represent a currency object returned by the API
 * Used in lease and receipt objects
 */
export class Currency {
    constructor(data) {
        this.id = data.id
        this.code = data.code
        this.name = data.name ?? null
    }

    toJSON() {
        return {
            id: this.id,
            code: this.code,
            name: this.name
        }
    }
}
