import { API_URLS } from "../../../../../support/routes/api_urls"

const ACCESS_MANAGEMENT_DASHBOARD_URL = `${Cypress.env('appAPIUrl')}/${API_URLS.accessManagementDashboard}`

class AccessMgmtDashboardRequest {

    getDashboard(url = ACCESS_MANAGEMENT_DASHBOARD_URL) {
        return cy.makeAPIRequest(url, 'GET')
    }
}

export default new AccessMgmtDashboardRequest()
