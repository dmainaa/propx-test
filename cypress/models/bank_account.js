/**
 * BankAccount class to represent a receiving account object returned by the API
 * Nested inside Receipt as receiving_account
 */
import { BankBranch } from './bank_branch'

export class BankAccount {
    constructor(data) {
        this.id = data.id
        this.accountName = data.account_name ?? null
        this.accountNumber = data.account_number ?? null
        this.bankBranch = data.bank_branch ? new BankBranch(data.bank_branch) : null
    }

    toJSON() {
        return {
            id: this.id,
            accountName: this.accountName,
            accountNumber: this.accountNumber,
            bankBranch: this.bankBranch ? this.bankBranch.toJSON() : null
        }
    }
}
