import propertyMgmtDashboardPage from '../../pages/property-management/property_mgmt_dashboard_page'
import propMgmtSideBarPage from '../../pages/side-bar/prop_mgmt_side_bar_page'
import menuData from '../../../fixtures/property-management/property_mgmt_menu.json'
import { API_URLS } from '../../../support/routes/api_urls'

describe('Property Management Dashboard Test Suite', () => {

    beforeEach(() => {
        
    })

    it('verifies all dashboard elements are visible', () => {
        propertyMgmtDashboardPage.title.should('be.visible')
        propertyMgmtDashboardPage.welcomeText.should('be.visible')
        propertyMgmtDashboardPage.allTimeLabel.should('be.visible')
        propertyMgmtDashboardPage.dropdown.should('be.visible')
        propertyMgmtDashboardPage.dropdownTrigger.should('be.visible')
        propertyMgmtDashboardPage.filterDashboardButton.should('be.visible')

        propertyMgmtDashboardPage.billingsCard.should('be.visible')
        propertyMgmtDashboardPage.collectionsCard.should('be.visible')
        propertyMgmtDashboardPage.arrearsCard.should('be.visible')

        propertyMgmtDashboardPage.collectionsReportCard.should('be.visible')
        propertyMgmtDashboardPage.collectionsReportTitle.should('be.visible')
        propertyMgmtDashboardPage.collectionsChartContainer.should('be.visible')
        propertyMgmtDashboardPage.collectionsChartLineSvg.should('be.visible')
        propertyMgmtDashboardPage.getYLabel(0).should('be.visible')
        propertyMgmtDashboardPage.getYLabel(1).should('be.visible')
        propertyMgmtDashboardPage.getXLabel(0).should('be.visible')
        propertyMgmtDashboardPage.getXLabel(1).should('be.visible')

        propertyMgmtDashboardPage.lpoStatusCard.should('be.visible')
        propertyMgmtDashboardPage.lpoStatusTotalLpos.should('be.visible')

        propertyMgmtDashboardPage.expiringLeasesCard.should('be.visible')
        propertyMgmtDashboardPage.expiringLeasesSeeAll.should('be.visible')

        propertyMgmtDashboardPage.openTicketsCard.should('be.visible')
        propertyMgmtDashboardPage.openTicketsSeeAll.should('be.visible')
        propertyMgmtDashboardPage.getMediumBadge(0).should('be.visible')
        propertyMgmtDashboardPage.getMediumBadge(1).should('be.visible')
        propertyMgmtDashboardPage.getHighBadge(0).should('be.visible')
        propertyMgmtDashboardPage.getHighBadge(1).should('be.visible')
        propertyMgmtDashboardPage.getLowBadge(0).should('be.visible')
    })

})

describe('Property Management Dashboard - Permission Visibility Scenarios', () => {

    const ALL_PERMISSIONS = [
        "view-bank-account",
        "create-bank-account",
        "view-facility",
        "create-facility",
        "view-facility-bill",
        "create-facility-bill",
        "view-facility-contract",
        "create-facility-contract",
        "view-facility-credit-note",
        "create-facility-credit-note",
        "view-facility-expense",
        "create-facility-expense",
        "view-facility-floor",
        "create-facility-floor",
        "view-facility-invoice",
        "create-facility-invoice",
        "view-facility-payment-voucher",
        "create-facility-payment-voucher",
        "view-facility-procurement-lpo",
        "view-facility-procurement-request",
        "create-facility-procurement-request",
        "view-facility-purchase-item",
        "create-facility-purchase-item",
        "view-facility-receipt",
        "create-facility-receipt",
        "view-facility-remittance",
        "create-facility-remittance",
        "view-facility-settlement",
        "create-facility-settlement",
        "view-facility-ticket",
        "create-facility-ticket",
        "view-lease",
        "create-lease",
        "view-lease-application",
        "view-lease-billing",
        "view-lease-collection",
        "view-lease-components-payment-priority",
        "create-lease-components-payment-priority",
        "view-lease-deposit",
        "view-lease-escalation",
        "view-lease-item",
        "view-lease-item-component",
        "view-lease-opening-balance",
        "view-procurement-request-step-template-group",
        "create-procurement-request-step-template-group",
        "view-landlord",
        "create-landlord",
        "view-vendor",
        "create-vendor",
        "view-facility-site-visit-report",
        "create-facility-site-visit-report",
        "view-facility-procurement-request-bid",
        "create-facility-procurement-request-bid"
    ]

    const stubDashboard = (permissions) => {
        cy.intercept('GET', 'https://propx-core.on-forge.com/api/v1/app/1/property-management', {
            statusCode: 200,
            body: {
                data: {
                    month_total_expenses: '0',
                    pending_jobs: '0',
                    open_tickets: 0,
                    month_power_usage: '0',
                    graphs: {},
                    recent_tickets: [],
                    permissions
                }
            }
        }).as('dashboardStub')
    }

    context('With all permissions granted', () => {

        beforeEach(() => {
            stubDashboard(ALL_PERMISSIONS)
            propertyMgmtDashboardPage.navigateToDashboard()
            cy.wait('@dashboardStub')
        })

        it('Tickets menu item is visible', () => {
            propMgmtSideBarPage.tickets.should('be.visible')
        })

        it('Lease management sub-menu items are visible', () => {
            propMgmtSideBarPage.openTenantManagement()
            propMgmtSideBarPage.getMenuItem(menuData.tenantManagement.leaseManagement.items.leases).should('be.visible')
            propMgmtSideBarPage.getMenuItem(menuData.tenantManagement.leaseManagement.items.leaseApplications).should('be.visible')
        })

        it('Billing and receipting sub-menu items are visible', () => {
            propMgmtSideBarPage.openTenantManagement()
            propMgmtSideBarPage.getMenuItem(menuData.tenantManagement.billingAndReceipting.items.invoices).should('be.visible')
            propMgmtSideBarPage.getMenuItem(menuData.tenantManagement.billingAndReceipting.items.creditNotes).should('be.visible')
            propMgmtSideBarPage.getMenuItem(menuData.tenantManagement.billingAndReceipting.items.receipts).should('be.visible')
            propMgmtSideBarPage.getMenuItem(menuData.tenantManagement.billingAndReceipting.items.utilityBilling).should('be.visible')
        })

        it('Procurement sub-menu items are visible', () => {
            propMgmtSideBarPage.openSupplierManagement()
            propMgmtSideBarPage.getMenuItem(menuData.supplierManagement.procurement.items.procurementRequests).should('be.visible')
            propMgmtSideBarPage.getMenuItem(menuData.supplierManagement.procurement.items.localPurchaseOrders).should('be.visible')
            propMgmtSideBarPage.getMenuItem(menuData.supplierManagement.procurement.items.serviceContracts).should('be.visible')
        })

    })

    context('With empty permissions', () => {

        beforeEach(() => {
            stubDashboard([])
            propertyMgmtDashboardPage.navigateToDashboard()
            cy.wait('@dashboardStub')
        })

        it('Tickets menu item is not visible', () => {
            cy.get('[data-cy="sidebar-section"] a').contains(menuData.tickets).should('not.exist')
        })

        it('Lease management sub-menu items are not visible', () => {
            propMgmtSideBarPage.openTenantManagement()
            cy.get('[data-cy="sidebar-section"] a').contains(menuData.tenantManagement.leaseManagement.items.leases).should('not.exist')
            cy.get('[data-cy="sidebar-section"] a').contains(menuData.tenantManagement.leaseManagement.items.leaseApplications).should('not.exist')
        })

        it('Billing and receipting sub-menu items are not visible', () => {
            propMgmtSideBarPage.openTenantManagement()
            cy.get('[data-cy="sidebar-section"] a').contains(menuData.tenantManagement.billingAndReceipting.items.invoices).should('not.exist')
            cy.get('[data-cy="sidebar-section"] a').contains(menuData.tenantManagement.billingAndReceipting.items.creditNotes).should('not.exist')
            cy.get('[data-cy="sidebar-section"] a').contains(menuData.tenantManagement.billingAndReceipting.items.receipts).should('not.exist')
            cy.get('[data-cy="sidebar-section"] a').contains(menuData.tenantManagement.billingAndReceipting.items.utilityBilling).should('not.exist')
        })

        it('Procurement sub-menu items are not visible', () => {
            propMgmtSideBarPage.openSupplierManagement()
            cy.get('[data-cy="sidebar-section"] a').contains(menuData.supplierManagement.procurement.items.procurementRequests).should('not.exist')
            cy.get('[data-cy="sidebar-section"] a').contains(menuData.supplierManagement.procurement.items.localPurchaseOrders).should('not.exist')
            cy.get('[data-cy="sidebar-section"] a').contains(menuData.supplierManagement.procurement.items.serviceContracts).should('not.exist')
        })

    })

})
