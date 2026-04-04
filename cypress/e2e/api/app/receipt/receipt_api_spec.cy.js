import receiptRequest from "../../request/app/receipt_request"
import { Receipt } from "../../../../models/receipt"

describe ('Receipts API Test Suite', () => {

    let receiptId

    it('Verify receipts are loaded from api', () => {
        receiptRequest.getReceipts().then((response) => {
            console.log(response.body.data)
            expect(response.status).eq(200)
            expect(response.body.data.length).to.be.greaterThan(0)
            receiptId = response.body.data[0].id
        })
    })

    it('Verify a single receipt can be retrieved by id', () => {
        receiptRequest.viewReceipt().then((response) => {
            expect(response.status).eq(200)
            expect(response.body.data).to.not.be.null
            const receipt = new Receipt(response.body.data)
            expect(receipt.id).to.be.a('number').and.eq(receiptId)
            expect(receipt.amount).to.be.a('string')
            expect(receipt.transactionNumber).to.be.a('string')
        })
    })



})

