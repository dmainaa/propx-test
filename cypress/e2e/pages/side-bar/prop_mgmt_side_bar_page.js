import { ROUTES } from '../../../support/routes/routes'
import menuData from '../../../fixtures/property-management/property_mgmt_menu.json'

const collapsibleMenu = (label) =>
    cy.get('[data-cy="sidebar-section"] span').contains(label).parents('.flex.cursor-pointer')

const selectors = {
    sidebar:              () => cy.get('[data-cy="sidebar"]'),
    sidebarHeader:        () => cy.get('[data-cy="sidebar-header"]'),
    quickActionsTrigger:  () => cy.get('[data-cy="quick-actions-trigger"]'),
    sidebarBody:          () => cy.get('[data-cy="sidebar-body"]'),
    dashboard:            () => cy.get('[data-cy="sidebar-section"] a').contains(menuData.dashboard),
    tickets:              () => cy.get('[data-cy="sidebar-section"] a').contains(menuData.tickets),
    tenantManagement:     () => collapsibleMenu(menuData.tenantManagement.index),
    landlordManagement:   () => collapsibleMenu(menuData.landlordManagement.index),
    supplierManagement:   () => collapsibleMenu(menuData.supplierManagement.index),
    settings:             () => cy.get('a').contains('Settings'),
}

class PropMgmtSideBarPage {

    get sidebar()             { return selectors.sidebar().scrollIntoView() }
    get sidebarHeader()       { return selectors.sidebarHeader().scrollIntoView() }
    get quickActionsTrigger() { return selectors.quickActionsTrigger().scrollIntoView() }
    get sidebarBody()         { return selectors.sidebarBody().scrollIntoView() }
    get dashboard()           { return selectors.dashboard().scrollIntoView() }
    get tickets()             { return selectors.tickets().scrollIntoView() }
    get tenantManagement()    { return selectors.tenantManagement().scrollIntoView() }
    get landlordManagement()  { return selectors.landlordManagement().scrollIntoView() }
    get supplierManagement()  { return selectors.supplierManagement().scrollIntoView() }
    get settings()            { return selectors.settings().scrollIntoView() }

    openTenantManagement()   { this.tenantManagement.click() }
    openLandlordManagement() { this.landlordManagement.click() }
    openSupplierManagement() { this.supplierManagement.click() }

    getMenuItem(label) {
        return cy.get('[data-cy="sidebar-section"] a').contains(label).scrollIntoView()
    }

    getTenantMenuItem(label) {
        this.openTenantManagement()
        return this.getMenuItem(label)
    }

    getLandlordMenuItem(label) {
        this.openLandlordManagement()
        return this.getMenuItem(label)
    }

    getSupplierMenuItem(label) {
        this.openSupplierManagement()
        return this.getMenuItem(label)
    }

    // ── Top-level navigation ───────────────────────────────────────────────────
    navigateToDashboard()  { this.dashboard.click() }
    navigateToTickets()    { this.tickets.click() }
    navigateToSettings()   { this.settings.click() }

    // ── Tenant Management ──────────────────────────────────────────────────────
    navigateToLeases() {
        this.openTenantManagement()
        this.getMenuItem(menuData.tenantManagement.leaseManagement.items.leases).click()
    }

    navigateToLeaseApplications() {
        this.openTenantManagement()
        this.getMenuItem(menuData.tenantManagement.leaseManagement.items.leaseApplications).click()
    }

    navigateToExitNotices() {
        this.openTenantManagement()
        this.getMenuItem(menuData.tenantManagement.leaseManagement.items.exitNotices).click()
    }

    navigateToInvoices() {
        this.openTenantManagement()
        this.getMenuItem(menuData.tenantManagement.billingAndReceipting.items.invoices).click()
    }

    navigateToCreditNotes() {
        this.openTenantManagement()
        this.getMenuItem(menuData.tenantManagement.billingAndReceipting.items.creditNotes).click()
    }

    navigateToReceipts() {
        this.openTenantManagement()
        this.getMenuItem(menuData.tenantManagement.billingAndReceipting.items.receipts).click()
    }

    navigateToUtilityBilling() {
        this.openTenantManagement()
        this.getMenuItem(menuData.tenantManagement.billingAndReceipting.items.utilityBilling).click()
    }

    navigateToLandFeeBilling() {
        this.openTenantManagement()
        this.getMenuItem(menuData.tenantManagement.billingAndReceipting.items.landFeeBilling).click()
    }

    navigateToTenantNoticeBoard() {
        this.openTenantManagement()
        this.getMenuItem(menuData.tenantManagement.tenants.items.noticeBoard).click()
    }

    // ── Landlord Management ────────────────────────────────────────────────────
    navigateToProperties() {
        this.openLandlordManagement()
        this.getMenuItem(menuData.landlordManagement.propertyManagement.items.properties).click()
    }

    navigateToSpaces() {
        this.openLandlordManagement()
        this.getMenuItem(menuData.landlordManagement.propertyManagement.items.spaces).click()
    }

    navigateToRemittances() {
        this.openLandlordManagement()
        this.getMenuItem(menuData.landlordManagement.landlordPayments.items.remittances).click()
    }

    navigateToLandlordPaymentVouchers() {
        this.openLandlordManagement()
        this.getMenuItem(menuData.landlordManagement.landlordPayments.items.paymentVouchers).click()
    }

    navigateToLandlordSettlements() {
        this.openLandlordManagement()
        this.getMenuItem(menuData.landlordManagement.landlordPayments.items.settlements).click()
    }

    navigateToLandlordNoticeBoard() {
        this.openLandlordManagement()
        this.getMenuItem(menuData.landlordManagement.landlords.items.noticeBoard).click()
    }

    // ── Supplier Management ────────────────────────────────────────────────────
    navigateToProcurementRequests() {
        this.openSupplierManagement()
        this.getMenuItem(menuData.supplierManagement.procurement.items.procurementRequests).click()
    }

    navigateToLocalPurchaseOrders() {
        this.openSupplierManagement()
        this.getMenuItem(menuData.supplierManagement.procurement.items.localPurchaseOrders).click()
    }

    navigateToServiceContracts() {
        this.openSupplierManagement()
        this.getMenuItem(menuData.supplierManagement.procurement.items.serviceContracts).click()
    }

    navigateToBills() {
        this.openSupplierManagement()
        this.getMenuItem(menuData.supplierManagement.supplierPayments.items.bills).click()
    }

    navigateToSupplierPaymentVouchers() {
        this.openSupplierManagement()
        this.getMenuItem(menuData.supplierManagement.supplierPayments.items.paymentVouchers).click()
    }

    navigateToSupplierSettlements() {
        this.openSupplierManagement()
        this.getMenuItem(menuData.supplierManagement.supplierPayments.items.settlements).click()
    }

    navigateToSupplierNoticeBoard() {
        this.openSupplierManagement()
        this.getMenuItem(menuData.supplierManagement.suppliers.items.noticeBoard).click()
    }
}

export default new PropMgmtSideBarPage()
