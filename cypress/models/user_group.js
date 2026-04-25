export class UserGroup {
    constructor(data) {
        this.id = data.id
        this.title = data.title ?? null
        this.label = data.label ?? null
        this.description = data.description ?? null
        this.canRegister = data.can_register ?? null
        this.requireCompany = data.require_company ?? null
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            label: this.label,
            description: this.description,
            canRegister: this.canRegister,
            requireCompany: this.requireCompany
        }
    }
}
