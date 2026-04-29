export class RecentActivity {
    constructor(data) {
        this.id = data.id
        this.type = data.type ?? null
        this.summary = data.summary ?? null
        this.at = data.at ?? null
    }

    toJSON() {
        return {
            id: this.id,
            type: this.type,
            summary: this.summary,
            at: this.at
        }
    }
}
