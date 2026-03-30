/**
 * Status class to represent a status object returned by the API
 * Used for fields like invoice status, payment status, credit status, etc.
 */
export class Status {
    constructor(data) {
        this.value = data?.value ?? null
        this.color = data?.color ?? null
    }

    toJSON() {
        return {
            value: this.value,
            color: this.color
        }
    }
}
