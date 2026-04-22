export class Permission {
    constructor(data) {
        this.id = data.id
        this.tag = data.tag ?? null
        this.resource = data.resource ?? null
        this.name = data.name ?? null
    }

    toJSON() {
        return {
            id: this.id,
            tag: this.tag,
            resource: this.resource,
            name: this.name
        }
    }
}
