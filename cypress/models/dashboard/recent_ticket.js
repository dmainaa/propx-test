class TicketSummary {
    constructor(data) {
        this.primary = data.primary ?? null
        this.secondary = data.secondary ?? null
    }

    toJSON() {
        return {
            primary: this.primary,
            secondary: this.secondary
        }
    }
}

class AssignedUser {
    constructor(data) {
        this.primary = data.primary ?? null
        this.secondary = data.secondary ?? null
        this.imageUrl = data.image_url ?? null
    }

    toJSON() {
        return {
            primary: this.primary,
            secondary: this.secondary,
            imageUrl: this.imageUrl
        }
    }
}

export class RecentTicket {
    constructor(data) {
        this.request = data.request ? new TicketSummary(data.request) : null
        this.facility = data.facility ? new TicketSummary(data.facility) : null
        this.assignedUser = data.assigned_user ? new AssignedUser(data.assigned_user) : null
        this.allowedActions = Array.isArray(data.allowed_actions) ? [...data.allowed_actions] : []
    }

    toJSON() {
        return {
            request: this.request ? this.request.toJSON() : null,
            facility: this.facility ? this.facility.toJSON() : null,
            assignedUser: this.assignedUser ? this.assignedUser.toJSON() : null,
            allowedActions: [...this.allowedActions]
        }
    }
}
