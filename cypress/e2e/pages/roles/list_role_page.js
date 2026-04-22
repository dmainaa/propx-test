import { ROUTES } from '../../../support/routes/routes'
import { SEGMENTS } from '../../../support/routes/segments'
import rolesData from '../../../fixtures/access-management/roles_data.json'

const tableRow = (index) => cy.get(`[data-cy="table-row-${index}"]`)
const rowCell = (rowIndex, field) => cy.get(`[data-cy="table-row-${rowIndex}-${field}"]`)
const rowActions = (index) => cy.get(`[data-cy="row-${index}-actions"]`)
const rowActionsToggle = (index) => cy.get(`[data-cy="row-${index}-actions-toggle"]`)

const selectors = {
    pageTitle:           () => cy.get('[data-cy="roles-management-page-title"]'),
    pageSubtitle:        () => cy.get('[data-cy="roles-management-page-subtitle"]'),
    createRoleButton:    () => cy.get('[data-cy="roles-management-create-btn"]'),
    searchInput:         () => cy.get('[data-cy="roles-list-header-search-input"]'),
    filterButton:        () => cy.get('[data-cy="roles-list-header-filter-btn"]'),
    tableHeaderRow:      () => cy.get('[data-cy="table-header-row"]'),
    checkboxes:          () => cy.get('tbody [data-cy="checkbox-input"]'),
    paginationPerPage:   () => cy.get('[data-cy="select-trigger"]'),
    paginationInfo:      () => cy.get('[data-cy="roles-list-pagination-info"]'),
}


class ListRolePage {

    get pageTitle()         { return selectors.pageTitle().scrollIntoView() }
    get pageSubtitle()      { return selectors.pageSubtitle().scrollIntoView() }
    get createRoleButton()  { return selectors.createRoleButton().scrollIntoView() }
    get searchInput()       { return selectors.searchInput().scrollIntoView() }
    get filterButton()      { return selectors.filterButton().scrollIntoView() }
    get tableHeaderRow()    { return selectors.tableHeaderRow().scrollIntoView() }
    get checkboxes()        { return selectors.checkboxes() }
    get paginationPerPage() { return selectors.paginationPerPage().scrollIntoView() }
    get paginationInfo()    { return selectors.paginationInfo().scrollIntoView() }

    getTableRow(index = 0)           { return tableRow(index).scrollIntoView() }
    getRoleId(index = 0)             { return rowCell(index, 'roleId').scrollIntoView() }
    getRoleName(index = 0)           { return rowCell(index, 'name').scrollIntoView() }
    getEnforceOnFacility(index = 0)  { return rowCell(index, 'enforce_on_facility').scrollIntoView() }
    getUserGroupLabel(index = 0)     { return rowCell(index, 'userGroup.label').scrollIntoView() }
    getCreatedDate(index = 0)        { return rowCell(index, 'created.formatted').scrollIntoView() }
    getRowActions(index = 0)         { return rowActions(index).scrollIntoView() }
    getRowActionsToggle(index = 0)   { return rowActionsToggle(index).scrollIntoView() }

    fillSearch(query) {
        this.searchInput.clear().type(query)
    }

    clickCreateRole() {
        this.createRoleButton.click()
    }

    clickFilterButton() {
        this.filterButton.click()
    }

    viewRole(index = 0) {
        this.getRowActions(index).click()
    }

    openRowActionsMenu(index = 0) {
        this.getRowActionsToggle(index).click()
    }

    // ── Navigation ─────────────────────────────────────────────────────────────
    navigateToRolesList() {
        cy.loginAsSuperAdmin('Access Management')
        cy.visit(ROUTES.app.child(SEGMENTS.APP.ACCESSMANAGEMENT, SEGMENTS.ACCESSMANAGEMENT.ROLES))
    }

    verifyPageHeader() {
        this.pageTitle.should('contain.text', rolesData.pageTitle)
        this.pageSubtitle.should('contain.text', rolesData.pageSubtitle)
    }
}


export default new ListRolePage()
