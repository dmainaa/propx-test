import data from '../../../fixtures/credit-note/credit_note_data.json'
import { Invoice } from '../../../models/invoice'
import { CreditNote } from '../../../models/creditNote'

const selectors = {
  dueDateSelector: () => cy.contains('label', data.createFormLabels[0]).parent().parent().find('button'),
  selectLeaseInputField: () => cy.get(`input[placeholder="${data.createFormHints[0]}"]`),
  linkToInvoiceInputField: () => cy.get(`input[placeholder="${data.createFormHints[1]}"]`),
  referenceNumberInputField: () => cy.get(`input[placeholder="${data.createFormHints[2]}"]`),
  notesInputField: () => cy.get(`textarea`),
  componentInputField: () => cy.get('td').find('input').first(),
  itemNotesInputField: () => cy.get('td').find('input').eq(1),
  quantityInputField: () => cy.get('td').find('input').eq(2),
  amountInputField: () => cy.get('td').find('input').eq(3),
  taxInputField: () => cy.get('td').find('input').eq(4),
  addComponentItemButton: () => cy.get('main').find('button').contains('Add Item'),
  invoiceCreditableAmountLabel: () => cy.get('p').contains(`${data.createFormLabels[6]}`),
  creditAmountLabel: () => cy.get('p').contains(`${data.createFormLabels[7]}`),
  invoiceBalanceLabel: () => cy.get('p').contains(`${data.createFormLabels[8]}`),
  submitButton: () => cy.contains('button', data.submitButtonLabel)
};

class CreateCreditNotePage {
  get dueDateSelector() { return selectors.dueDateSelector().scrollIntoView(); }
  get selectLeaseInputField() { return selectors.selectLeaseInputField().scrollIntoView(); }
  get linkToInvoiceInputField() { return selectors.linkToInvoiceInputField().scrollIntoView(); }
  get referenceNumberInputField() { return selectors.referenceNumberInputField().scrollIntoView(); }
  get notesInputField() { return selectors.notesInputField().scrollIntoView(); }

  get componentInputField() { return selectors.componentInputField().scrollIntoView(); }
  get itemNotesInputField() { return selectors.itemNotesInputField().scrollIntoView(); }
  get quantityInputField() { return selectors.quantityInputField().scrollIntoView(); }
  get amountInputField() { return selectors.amountInputField().scrollIntoView(); }
  get taxInputField() { return selectors.taxInputField().scrollIntoView(); }
  get submitButton() { return selectors.submitButton().scrollIntoView(); }
  get invoiceCreditableAmountLabel() { return selectors.invoiceCreditableAmountLabel().scrollIntoView(); }
  get creditAmountLabel() { return selectors.creditAmountLabel().scrollIntoView(); }
  get invoiceBalanceLabel() { return selectors.invoiceBalanceLabel().scrollIntoView(); }

  openDatePicker() {
    this.dueDateSelector.click()
  }

  selectDueDate() {
    this.openDatePicker()
    cy.selectDate(10)
  }

  searchAndSelectLease() {
    this.selectLeaseInputField.click()
    cy.selectDropdownItem()
  }

  searchAndSelectInvoice() {
    cy.intercept('GET', '**/invoices**').as('invoices')
    this.linkToInvoiceInputField.click()
    cy.selectDropdownItem()
    return cy.wait('@invoices').then(({ response }) => response?.body?.data?.[0])
  }

  searchAndSelectItemComponent() {
    this.componentInputField.click()
    cy.selectDropdownItem()
  }

  searchAndSelectTaxType() {
    this.taxInputField.click()
    cy.selectDropdownItem()
  }

  fillReferenceNumber(referenceNumber) {
    this.referenceNumberInputField.clear().type(referenceNumber)
  }

  fillNotes(notes) {
    this.notesInputField.clear().type(notes)
  }

  fillItemNotes(itemNotes) {
    this.itemNotesInputField.clear().type(itemNotes)
  }

  fillQuantity(quantity) {
    this.quantityInputField.clear().type(quantity)
  }

  fillAmount(amount) {
    this.amountInputField.clear().type(amount)
  }

  fillCreditNoteItem({ component, itemNotes, quantity, amount, tax } = {}) {
    if (component) this.searchAndSelectItemComponent()
    if (itemNotes) this.fillItemNotes(itemNotes)
    if (amount !== undefined) this.fillAmount(amount)
    if (tax) this.searchAndSelectTaxType()
    if (quantity !== undefined) this.fillQuantity(quantity)
  }

  createCreditNote({ referenceNumber, notes, item } = {}) {
    this.selectDueDate()
    this.searchAndSelectLease()

    return this.searchAndSelectInvoice().then((invoice) => {
      const invoiceBalance = invoice?.balance/2 ?? ''

      if (referenceNumber) this.fillReferenceNumber(referenceNumber)
      if (notes) this.fillNotes(notes)

      const finalItem = {
        ...item,
        amount: (item?.amount) ?? `${invoiceBalance}`,
        quantity: item?.quantity ?? 1
      }

      this.fillCreditNoteItem(finalItem)

      cy.intercept('POST', '**/credit-notes**').as('createCreditNote')
      this.submitButton.click()

      return cy.wait('@createCreditNote').then(({ response }) => {
        const creditNoteData = response?.body?.data?.credit_note
        console.log(creditNoteData)
        return new CreditNote(creditNoteData)
      })
    })
  }
}

export default new CreateCreditNotePage();
