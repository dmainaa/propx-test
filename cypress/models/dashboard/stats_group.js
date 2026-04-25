export class StatsGroup {
    constructor(data) {
        this.total = data.total ?? 0
        this.active = data.active ?? 0
        this.suspended = data.suspended ?? 0
        this.inactive = data.inactive ?? 0
    }

    toJSON() {
        return {
            total: this.total,
            active: this.active,
            suspended: this.suspended,
            inactive: this.inactive
        }
    }
}
