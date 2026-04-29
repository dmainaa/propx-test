import { GraphData } from './dashboard/graph_data'
import { RecentTicket } from './dashboard/recent_ticket'

class DashboardGraphs {
    constructor(data) {
        this.expenses = data.expenses ? new GraphData(data.expenses) : null
        this.powerUsage = data.power_usage ? new GraphData(data.power_usage) : null
    }

    toJSON() {
        return {
            expenses: this.expenses ? this.expenses.toJSON() : null,
            powerUsage: this.powerUsage ? this.powerUsage.toJSON() : null
        }
    }
}

export class ProjectManagementDashboard {
    constructor(data) {
        this.monthTotalExpenses = data.month_total_expenses ?? null
        this.pendingJobs = data.pending_jobs ?? null
        this.openTickets = data.open_tickets ?? 0
        this.monthPowerUsage = data.month_power_usage ?? null
        this.graphs = data.graphs ? new DashboardGraphs(data.graphs) : null
        this.recentTickets = Array.isArray(data.recent_tickets)
            ? data.recent_tickets.map(t => new RecentTicket(t))
            : []
        this.permissions = Array.isArray(data.permissions) ? [...data.permissions] : []
    }

    toJSON() {
        return {
            monthTotalExpenses: this.monthTotalExpenses,
            pendingJobs: this.pendingJobs,
            openTickets: this.openTickets,
            monthPowerUsage: this.monthPowerUsage,
            graphs: this.graphs ? this.graphs.toJSON() : null,
            recentTickets: this.recentTickets.map(t => t.toJSON()),
            permissions: [...this.permissions]
        }
    }
}
