//Custom Invoice Commands
import { ROUTES } from "../../routes/routes"
import { SEGMENTS } from "../../routes/segments"

Cypress.Commands.add('visitInvoicesPage', () => {
    cy.visit(ROUTES.app.child(SEGMENTS.APP.PROPERTYMANAGEMENT, SEGMENTS.APP.LEASEMANAGEMENT, SEGMENTS.APP.INVOICES))

})