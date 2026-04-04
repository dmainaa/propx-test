/**
 * BankBranch class to represent a bank branch object returned by the API
 * Nested inside BankAccount
 */
import { Bank } from './bank'

export class BankBranch {
    constructor(data) {
        this.id = data.id
        this.name = data.name ?? null
        this.bank = data.bank ? new Bank(data.bank) : null
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            bank: this.bank ? this.bank.toJSON() : null
        }
    }
}
