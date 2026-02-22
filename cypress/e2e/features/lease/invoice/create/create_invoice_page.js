// ─── UI Elements (raw selectors) ──────────────────────────────────────────────

const tableInput = (index) => cy.get('table').first().find('tbody tr td input').eq(index);

const selectors = {
  dueDateButton:    () => cy.contains('label', 'Due Date').parent().parent().find('button'),
  selectLeaseInput: () => cy.get('input[placeholder="Search leases..."]'),
  invoiceNotes:     () => cy.get('textarea[placeholder="Enter invoice notes"]'),
  component:        () => tableInput(0),
  itemNotes:        () => tableInput(1),
  qty:              () => tableInput(2),
  amount:           () => tableInput(3),
  tax:              () => tableInput(4),
  addInvoiceButton: () => cy.contains('button', 'Create Invoice'),
  cancelInvoiceButton: () => cy.contains('button', 'Cancel')
};

class CreateInvoicePage {

  get dueDateButton()    { return selectors.dueDateButton().scrollIntoView(); }
  get selectLeaseInput() { return selectors.selectLeaseInput().scrollIntoView(); }
  get invoiceNotes()     { return selectors.invoiceNotes().scrollIntoView(); }
  get component()        { return selectors.component().scrollIntoView(); }
  get itemNotes()        { return selectors.itemNotes().scrollIntoView(); }
  get qty()              { return selectors.qty().scrollIntoView(); }
  get amount()           { return selectors.amount().scrollIntoView(); }
  get tax()              { return selectors.tax().scrollIntoView(); }
  get addInvoiceButton() { return selectors.addInvoiceButton().scrollIntoView(); }
  get cancelInvoiceButton() { return selectors.cancelInvoiceButton().scrollIntoView(); }

  openDatePicker() {
    this.dueDateButton.click();
  }

  selectDueDate() {
    this.openDatePicker();
    cy.selectDate(10)
  }

  searchAndSelectLease() {
    this.selectLeaseInput.click();
    cy.selectDropdownItem()
  }

  searchAndSelectItemComponent() {
    this.component.click()
    cy.selectDropdownItem()
  }

  searchAndSelectTaxType() {
    this.tax.click()
    cy.selectDropdownItem()
  }

  fillInvoiceNotes(notes) {
    this.invoiceNotes.clear().type(notes);
  }

  fillInvoiceItem({ component, notes, qty, amount, tax } = {}) {
    if (component) this.searchAndSelectItemComponent();
    if (notes)     this.fillInvoiceNotes(notes);
   
    if (amount)    this.amount.clear().type(amount);
    if (tax)       this.searchAndSelectTaxType();
    if (qty)       this.qty.clear().type(qty);
  }

  createInvoice({ notes, item } = {}) {
    this.selectDueDate();
    this.searchAndSelectLease();
    if (notes) this.fillInvoiceNotes(notes);
    this.fillInvoiceItem(item ?? {});
    this.addInvoiceButton.click();
  }
}

export default new CreateInvoicePage();
