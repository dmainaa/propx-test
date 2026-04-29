import dashboardData from '../../../fixtures/property-management/property_mgmt_dashboard_data.json'
import { ROUTES } from '../../../support/routes/routes'
import { SEGMENTS } from '../../../support/routes/segments'

const cardByHeading = (tag, title) =>
    cy.contains(tag, title).parents('.rounded-card')

const selectors = {
    title:                     () => cy.contains('h1', dashboardData.title),
    welcomeText:               () => cy.contains('p', dashboardData.welcomeText),
    allTimeLabel:              () => cy.contains('span', dashboardData.allTimeLabel),
    dropdown:                  () => cy.get('[data-cy="dropdown"]'),
    dropdownTrigger:           () => cy.get('[data-cy="dropdown-trigger"]'),
    filterDashboardButton:     () => cy.get('[data-cy="filter-dashboard-button"]'),
    billingsCard:              () => cy.contains('p', dashboardData.statsCards.billings).parents('.rounded-card'),
    collectionsCard:           () => cy.contains('p', dashboardData.statsCards.collections).parents('.rounded-card'),
    arrearsCard:               () => cy.contains('p', dashboardData.statsCards.arrears).parents('.rounded-card'),
    collectionsReportCard:     () => cy.get('[data-cy="trend-chart-collections-report"]'),
    collectionsReportTitle:    () => cy.get('[data-cy="trend-chart-title"]'),
    collectionsChartContainer: () => cy.get('[data-cy="trend-chart-container"]'),
    collectionsChartLineSvg:   () => cy.get('[data-cy="trend-chart-line-svg"]'),
    collectionsYLabel:         (i) => cy.get('[data-cy="trend-chart-y-label"]').eq(i),
    collectionsXLabel:         (i) => cy.get('[data-cy="trend-chart-x-label"]').eq(i),
    lpoStatusCard:             () => cardByHeading('h3', dashboardData.lpoStatus.title),
    lpoStatusTotalLpos:        () => cardByHeading('h3', dashboardData.lpoStatus.title).find('p.text-2xl'),
    expiringLeasesCard:        () => cardByHeading('h3', dashboardData.expiringLeases.title),
    expiringLeasesSeeAll:      () => cardByHeading('h3', dashboardData.expiringLeases.title).find('button'),
    openTicketsCard:           () => cardByHeading('h3', dashboardData.openTickets.title),
    openTicketsSeeAll:         () => cardByHeading('h3', dashboardData.openTickets.title).find('button'),
    mediumBadge:               (i) => cy.get('[data-cy="medium-badge"]').eq(i),
    highBadge:                 (i) => cy.get('[data-cy="high-badge"]').eq(i),
    lowBadge:                  (i) => cy.get('[data-cy="low-badge"]').eq(i),
}

// ── Page Class ─────────────────────────────────────────────────────────────────
class PropertyMgmtDashboardPage {

    get title()                     { return selectors.title().scrollIntoView() }
    get welcomeText()               { return selectors.welcomeText().scrollIntoView() }
    get allTimeLabel()              { return selectors.allTimeLabel().scrollIntoView() }
    get dropdown()                  { return selectors.dropdown().scrollIntoView() }
    get dropdownTrigger()           { return selectors.dropdownTrigger().scrollIntoView() }
    get filterDashboardButton()     { return selectors.filterDashboardButton().scrollIntoView() }
    get billingsCard()              { return selectors.billingsCard().scrollIntoView() }
    get collectionsCard()           { return selectors.collectionsCard().scrollIntoView() }
    get arrearsCard()               { return selectors.arrearsCard().scrollIntoView() }
    get collectionsReportCard()     { return selectors.collectionsReportCard().scrollIntoView() }
    get collectionsReportTitle()    { return selectors.collectionsReportTitle().scrollIntoView() }
    get collectionsChartContainer() { return selectors.collectionsChartContainer().scrollIntoView() }
    get collectionsChartLineSvg()   { return selectors.collectionsChartLineSvg().scrollIntoView() }
    get lpoStatusCard()             { return selectors.lpoStatusCard().scrollIntoView() }
    get lpoStatusTotalLpos()        { return selectors.lpoStatusTotalLpos().scrollIntoView() }
    get expiringLeasesCard()        { return selectors.expiringLeasesCard().scrollIntoView() }
    get expiringLeasesSeeAll()      { return selectors.expiringLeasesSeeAll().scrollIntoView() }
    get openTicketsCard()           { return selectors.openTicketsCard().scrollIntoView() }
    get openTicketsSeeAll()         { return selectors.openTicketsSeeAll().scrollIntoView() }

    getYLabel(index)       { return selectors.collectionsYLabel(index).scrollIntoView() }
    getXLabel(index)       { return selectors.collectionsXLabel(index).scrollIntoView() }
    getMediumBadge(index)  { return selectors.mediumBadge(index).scrollIntoView() }
    getHighBadge(index)    { return selectors.highBadge(index).scrollIntoView() }
    getLowBadge(index)     { return selectors.lowBadge(index).scrollIntoView() }

    navigateToDashboard() {
        cy.loginAsSuperAdmin()
        cy.visit(ROUTES.app.child(SEGMENTS.APP.PROPERTYMANAGEMENT))
    }
}

export default new PropertyMgmtDashboardPage()
