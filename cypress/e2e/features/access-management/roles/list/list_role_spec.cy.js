import listRolePage from '../../../../pages/roles/list_role_page'
import { SEGMENTS } from '../../../../../support/routes/segments'
import { API_URLS } from '../../../../../support/routes/api_urls'

describe('Roles List Test Suite', () => {

    beforeEach(() => {
        listRolePage.navigateToRolesList()
    })

    it('Verify that all the elements are visible', () => {
        listRolePage.pageTitle.should('be.visible')
        listRolePage.pageSubtitle.should('be.visible')
        listRolePage.searchInput.should('be.visible')
        listRolePage.filterButton.should('be.visible')
        listRolePage.tableHeaderRow.should('be.visible')
        listRolePage.paginationPerPage.should('be.visible')
        listRolePage.paginationInfo.should('be.visible')
    })

    it('Verify that when the create button is clicked, it redirects to /create', () => {
        listRolePage.clickCreateRole()
        cy.url().should('include', `${SEGMENTS.ACCESSMANAGEMENT.ROLES}/${SEGMENTS.CREATE}`)
    })

})

describe('Roles List Permission Tests', () => {

    const mockRolesResponse = (canView, canCreate) => ({
        data: [
            {
                id: 1,
                name: 'Admin Role',
                description: 'Full access',
                enforce_on_facility: false,
                userGroup: { id: 1, title: 'Admins', label: 'Admins', description: '', can_register: false, require_company: true },
                created: { raw: '2024-01-01T00:00:00.000Z', formatted: 'Jan 01, 2024', diff: '1 year ago' },
                permissions: {
                    view: canView,
                    update: canCreate
                }
            },
            {
                id: 2,
                name: 'Staff Role',
                description: 'Limited access',
                enforce_on_facility: true,
                userGroup: { id: 2, title: 'Staff', label: 'Staff', description: '', can_register: false, require_company: false },
                created: { raw: '2024-02-01T00:00:00.000Z', formatted: 'Feb 01, 2024', diff: '11 months ago' },
                can: {
                    view: canView,
                    update: canCreate
                }
            }
        ],
        permissions: {
            view: canView,
            update: canCreate
        }
    })

    const rolesApiPattern = () => `${Cypress.env('appAPIUrl')}/${API_URLS.roles}**`

    context('can_view permission', () => {

        it('Verify row actions are visible when can_view is true', () => {
            cy.intercept('GET', rolesApiPattern(), { body: mockRolesResponse(true, true) }).as('getRoles')
            listRolePage.navigateToRolesList()
            cy.wait('@getRoles')
            listRolePage.getRowActions(1).should('be.visible')
        })

        it('Verify row actions are hidden when can_view is false', () => {
            cy.intercept('GET', rolesApiPattern(), { body: mockRolesResponse(false, true) }).as('getRoles')
            listRolePage.navigateToRolesList()
            cy.wait('@getRoles')
            listRolePage.getRowActions(1).should('not.exist')
        })

    })


})
