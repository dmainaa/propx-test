import { API_URLS } from "../../../../../support/routes/api_urls"

const ROLES_URL = `${Cypress.env('appAPIUrl')}/${API_URLS.roles}`

class RolesRequest {

    getRoles(url = ROLES_URL) {
        return cy.makeAPIRequest(url, 'GET')
    }

    viewRole(url = ROLES_URL) {
        return this.getRoles().then((response) => {
            return cy.makeAPIRequest(`${url}/${response.body.data[0].id}`, 'GET')
        })
    }

    createRole(body, url = ROLES_URL) {
        return cy.makeAPIRequest(url, 'POST', {}, body)
    }
}

export default new RolesRequest()
