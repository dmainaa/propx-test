/**
 * TaxType class to represent a tax type object returned by the API
 * Nested inside InvoiceItem
 */
export class TaxType {
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
