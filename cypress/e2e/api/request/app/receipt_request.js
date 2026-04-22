import { API_URLS } from "../../../../support/routes/api_urls"

const RECEIPTS_URL = `${API_URLS.receipts}`

class ReceiptRequest {

    getReceipts(url = RECEIPTS_URL) {
        return cy.makeAPIRequest(url, 'GET')
    }

    viewReceipt(url = RECEIPTS_URL) {
        return this.getReceipts().then((response) => {
            return cy.makeAPIRequest(`${url}/${response.body.data[0].id}`, 'GET')
        })
    }

    createReceipt(body, url = RECEIPTS_URL) {
        return cy.makeAPIRequest(url, 'POST', {}, body)
    }
}

export default new ReceiptRequest()
