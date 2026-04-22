import { DateField } from './date_field'
import { UserGroup } from './user_group'
import { Permission } from './permission'

export class Role {
    constructor(data) {
        this.id = data.id
        this.name = data.name ?? null
        this.description = data.description ?? null
        this.enforceOnFacility = data.enforce_on_facility ?? null
        this.userGroup = data.userGroup ? new UserGroup(data.userGroup) : null
        this.created = data.created ? new DateField(data.created) : null
        this.permissions = Array.isArray(data.permissions)
            ? data.permissions.map(p => new Permission(p))
            : []
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            enforceOnFacility: this.enforceOnFacility,
            userGroup: this.userGroup ? this.userGroup.toJSON() : null,
            created: this.created ? this.created.toJSON() : null,
            permissions: this.permissions.map(p => p.toJSON())
        }
    }
}
