/**
 * PaymentMethod class to represent a payment method object returned by the API
 * Nested inside Receipt as payment_method
 */
export class PaymentMethod {
    constructor(data) {
        this.id = data.id
        this.name = data.name ?? null
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name
        }
    }
}
