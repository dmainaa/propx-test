import { StatsGroup } from './stats_group'
import { Engagement } from './engagement'
import { DepartmentDistribution } from './department_distribution'
import { RecentActivity } from './recent_activity'

export class AccessManagementDashboard {
    constructor(data) {
        this.staff = data.staff ? new StatsGroup(data.staff) : null
        this.engagement = data.engagement ? new Engagement(data.engagement) : null
        this.companies = data.companies ? new StatsGroup(data.companies) : null
        this.userDistributionByDepartment = Array.isArray(data.user_distribution_by_department)
            ? data.user_distribution_by_department.map(d => new DepartmentDistribution(d))
            : []
        this.recentActivity = Array.isArray(data.recent_activity)
            ? data.recent_activity.map(a => new RecentActivity(a))
            : []
        this.permissions = Array.isArray(data.permissions) ? [...data.permissions] : []
    }

    toJSON() {
        return {
            staff: this.staff ? this.staff.toJSON() : null,
            engagement: this.engagement ? this.engagement.toJSON() : null,
            companies: this.companies ? this.companies.toJSON() : null,
            userDistributionByDepartment: this.userDistributionByDepartment.map(d => d.toJSON()),
            recentActivity: this.recentActivity.map(a => a.toJSON()),
            permissions: [...this.permissions]
        }
    }
}
