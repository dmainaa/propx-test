import accessMgmtDashboardRequest from "../../request/access-management/dashboard/access_mgmt_dashboard_request"
import { AccessManagementDashboard } from "../../../../models/dashboard/access_management_dashboard"

describe('Access Management Dashboard API Test Suite', () => {

    let dashboard

    before(() => {
        accessMgmtDashboardRequest.getDashboard().then((response) => {
            expect(response.status).eq(200)
            dashboard = new AccessManagementDashboard(response.body.data)
        })
    })

    it('Verify staff stats are returned', () => {
        expect(dashboard.staff).to.not.be.null
        expect(dashboard.staff.total).to.be.a('number')
        expect(dashboard.staff.active).to.be.a('number')
        expect(dashboard.staff.suspended).to.be.a('number')
        expect(dashboard.staff.inactive).to.be.a('number')
    })

    it('Verify companies stats are returned', () => {
        expect(dashboard.companies).to.not.be.null
        expect(dashboard.companies.total).to.be.a('number')
        expect(dashboard.companies.active).to.be.a('number')
        expect(dashboard.companies.suspended).to.be.a('number')
        expect(dashboard.companies.inactive).to.be.a('number')
    })

    it('Verify engagement data is returned', () => {
        expect(dashboard.engagement).to.not.be.null
        expect(dashboard.engagement.last30Days).to.not.be.null
        expect(dashboard.engagement.last30Days.login).to.be.a('number')
        expect(dashboard.engagement.last30Days.logout).to.be.a('number')
        expect(dashboard.engagement.recent).to.be.an('array').and.have.length.greaterThan(0)
        const entry = dashboard.engagement.recent[0]
        expect(entry.id).to.be.a('number')
        expect(entry.action).to.be.a('string')
        expect(entry.at).to.be.a('string')
        expect(entry.user).to.not.be.null
        expect(entry.user.id).to.be.a('number')
        expect(entry.user.name).to.be.a('string')
        expect(entry.user.email).to.be.a('string')
    })

    it('Verify user distribution by department is returned', () => {
        expect(dashboard.userDistributionByDepartment).to.be.an('array').and.have.length.greaterThan(0)
        const dept = dashboard.userDistributionByDepartment[0]
        expect(dept.name).to.be.a('string')
        expect(dept.total).to.be.a('number')
    })

    it('Verify recent activity is returned', () => {
        expect(dashboard.recentActivity).to.be.an('array').and.have.length.greaterThan(0)
        const activity = dashboard.recentActivity[0]
        expect(activity.id).to.be.a('number')
        expect(activity.type).to.be.a('string')
        expect(activity.summary).to.be.a('string')
        expect(activity.at).to.be.a('string')
    })

    it('Verify permissions are returned', () => {
        expect(dashboard.permissions).to.be.an('array').and.have.length.greaterThan(0)
        expect(dashboard.permissions[0]).to.be.a('string')
    })

})
