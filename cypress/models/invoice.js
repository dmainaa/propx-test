/**
 * Invoice class to represent an invoice object returned by the API
 * Maps the full show invoice API response: GET /invoices/:id
 */
import { DateField } from './date_field'
import { Status } from './status'
import { Lease } from './lease'
import { InvoiceItem } from './invoice_item'
import { Credit } from './creditNote'
import { Payment } from './payment'

export class Invoice {
    constructor(data) {
        this.id = data.id
        this.dueAt = data.due_at ? new DateField(data.due_at) : null
        this.lease = data.lease ? new Lease(data.lease) : null
        this.cuReferenceNumber = data.cu_reference_number ?? null
        this.notes = data.notes ?? null
        this.amount = data.amount
        this.tax = data.tax
        this.total = data.total
        this.paid = data.paid
        this.balance = data.balance
        this.cuInvoiceNumber = data.cu_invoice_number ?? null
        this.cuSerialNumber = data.cu_serial_number ?? null
        this.cuInvoiceVerifyUrl = data.cu_invoice_verify_url ?? null
        this.status = data.status ? new Status(data.status) : null
        this.invoiceItems = Array.isArray(data.invoice_items)
            ? data.invoice_items.map(item => new InvoiceItem(item))
            : []
        this.credits = Array.isArray(data.credits)
            ? data.credits.map(credit => new Credit(credit))
            : []
        this.payments = Array.isArray(data.payments)
            ? data.payments.map(payment => new Payment(payment))
            : []
        this.createdAt = data.created_at ? new DateField(data.created_at) : null
        this.disputedAt = data.disputed_at ? new DateField(data.disputed_at) : null
        this.disputeDetails = data.dispute_details ?? null
    }

    toJSON() {
        return {
            id: this.id,
            dueAt: this.dueAt ? this.dueAt.toJSON() : null,
            lease: this.lease ? this.lease.toJSON() : null,
            cuReferenceNumber: this.cuReferenceNumber,
            notes: this.notes,
            amount: this.amount,
            tax: this.tax,
            total: this.total,
            paid: this.paid,
            balance: this.balance,
            cuInvoiceNumber: this.cuInvoiceNumber,
            cuSerialNumber: this.cuSerialNumber,
            cuInvoiceVerifyUrl: this.cuInvoiceVerifyUrl,
            status: this.status ? this.status.toJSON() : null,
            invoiceItems: this.invoiceItems.map(item => item.toJSON()),
            credits: this.credits.map(credit => credit.toJSON()),
            payments: this.payments.map(payment => payment.toJSON()),
            createdAt: this.createdAt ? this.createdAt.toJSON() : null,
            disputedAt: this.disputedAt ? this.disputedAt.toJSON() : null,
            disputeDetails: this.disputeDetails
        }
    }
}
