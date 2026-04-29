import { API_URLS } from "../../../../../support/routes/api_urls"

const PROPERTY_MANAGEMENT_DASHBOARD_URL = `${Cypress.env('appAPIUrl')}/${API_URLS.propertyManagementDashboard}`

class PropertyMgmtDashboardRequest {

    getDashboard(url = PROPERTY_MANAGEMENT_DASHBOARD_URL) {
        return cy.makeAPIRequest(url, 'GET')
    }
}

export default new PropertyMgmtDashboardRequest()
