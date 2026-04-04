/**
 * Bank class to represent a bank object returned by the API
 * Nested inside BankBranch
 */
export class Bank {
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
