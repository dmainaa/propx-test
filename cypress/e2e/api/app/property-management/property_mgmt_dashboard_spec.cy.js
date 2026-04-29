import propertyMgmtDashboardRequest from "../../request/property-management/dashboard/property_mgmt_dashboard_request"
import { PropertyManagementDashboard } from "../../../../models/property_management_dashboard"

describe('Property Management Dashboard API Test Suite', () => {

    let dashboard

    before(() => {
        propertyMgmtDashboardRequest.getDashboard().then((response) => {
            expect(response.status).eq(200)
            dashboard = new PropertyManagementDashboard(response.body.data)
        })
    })

    it('Verify summary stats are returned', () => {
        expect(dashboard.monthTotalExpenses).to.be.a('string')
        expect(dashboard.pendingJobs).to.be.a('string')
        expect(dashboard.openTickets).to.be.a('number')
        expect(dashboard.monthPowerUsage).to.be.a('string')
    })

    it('Verify expenses graph data is returned', () => {
        expect(dashboard.graphs).to.not.be.null
        expect(dashboard.graphs.expenses).to.not.be.null
        expect(dashboard.graphs.expenses.data).to.be.an('array').and.have.length.greaterThan(0)
        expect(dashboard.graphs.expenses.topRightLabel).to.be.a('string')
        expect(dashboard.graphs.expenses.minValue).to.be.a('number')
        expect(dashboard.graphs.expenses.maxValue).to.be.a('number')
        const point = dashboard.graphs.expenses.data[0]
        expect(point.label).to.be.a('string')
        expect(point.value).to.be.a('string')
    })

    it('Verify power usage graph data is returned', () => {
        expect(dashboard.graphs.powerUsage).to.not.be.null
        expect(dashboard.graphs.powerUsage.data).to.be.an('array').and.have.length.greaterThan(0)
        expect(dashboard.graphs.powerUsage.topRightLabel).to.be.a('string')
        expect(dashboard.graphs.powerUsage.minValue).to.be.a('number')
        expect(dashboard.graphs.powerUsage.maxValue).to.be.a('number')
    })

    it('Verify recent tickets are returned', () => {
        expect(dashboard.recentTickets).to.be.an('array').and.have.length.greaterThan(0)
        const ticket = dashboard.recentTickets[0]
        expect(ticket.request).to.not.be.null
        expect(ticket.request.primary).to.be.a('string')
        expect(ticket.request.secondary).to.be.a('string')
        expect(ticket.facility).to.not.be.null
        expect(ticket.facility.primary).to.be.a('string')
        expect(ticket.assignedUser).to.not.be.null
        expect(ticket.assignedUser.primary).to.be.a('string')
        expect(ticket.assignedUser.secondary).to.be.a('string')
        expect(ticket.allowedActions).to.be.an('array').and.have.length.greaterThan(0)
    })

    it('Verify permissions are returned', () => {
        expect(dashboard.permissions).to.be.an('array').and.have.length.greaterThan(0)
        expect(dashboard.permissions[0]).to.be.a('string')
    })

})
