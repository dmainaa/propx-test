
import { SEGMENTS } from "../../../../support/routes/segments"
import { ROUTES } from "../../../../support/routes/routes"

class CreateLeasePage {

    navigateToCreateLeasePage() {
        cy.loginAsSuperAdmin()
        cy.visit(ROUTES.app.child(SEGMENTS.APP.PROPERTYMANAGEMENT, SEGMENTS.APP.LEASEMANAGEMENT, SEGMENTS.LEASEMANAGEMENT.LEASES, SEGMENTS.CREATE))
    }
}

export default new CreateLeasePage()