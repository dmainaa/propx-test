import { API_URLS } from "../../../../support/routes/api_urls"

const RECEIPTS_URL = `${Cypress.env('appAPIUrl')}/${API_URLS.receipts}`

class ReceiptRequest {

    getReceipts() {
        return cy.makeAPIRequest(RECEIPTS_URL, 'GET')
    }

    viewReceipt() {
        return this.getReceipts().then((response) => {
            return cy.makeAPIRequest(`${RECEIPTS_URL}/${response.body.data[0].id}`, 'GET')
        })
    }

    createReceipt(body) {
        return cy.makeAPIRequest(RECEIPTS_URL, 'POST', {}, body)
    }
}

export default new ReceiptRequest()
