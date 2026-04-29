class EngagementCount {
    constructor(data) {
        this.login = data.login ?? 0
        this.logout = data.logout ?? 0
    }

    toJSON() {
        return {
            login: this.login,
            logout: this.logout
        }
    }
}

class EngagementUser {
    constructor(data) {
        this.id = data.id
        this.name = data.name ?? null
        this.email = data.email ?? null
        this.phone = data.phone ?? null
        this.profilePhotoUrl = data.profile_photo_url ?? null
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            phone: this.phone,
            profilePhotoUrl: this.profilePhotoUrl
        }
    }
}

class EngagementEntry {
    constructor(data) {
        this.id = data.id
        this.action = data.action ?? null
        this.user = data.user ? new EngagementUser(data.user) : null
        this.at = data.at ?? null
    }

    toJSON() {
        return {
            id: this.id,
            action: this.action,
            user: this.user ? this.user.toJSON() : null,
            at: this.at
        }
    }
}

export class Engagement {
    constructor(data) {
        this.last30Days = data.last_30_days ? new EngagementCount(data.last_30_days) : null
        this.recent = Array.isArray(data.recent)
            ? data.recent.map(e => new EngagementEntry(e))
            : []
    }

    toJSON() {
        return {
            last30Days: this.last30Days ? this.last30Days.toJSON() : null,
            recent: this.recent.map(e => e.toJSON())
        }
    }
}
