/**
 * User class to represent registered user data
 */
export class User {
    constructor(data) {
        this.id = data.id
        this.firstName = data.first_name
        this.lastName = data.last_name
        this.name = data.name
        this.email = data.email
        this.phone = data.phone
        this.portal = data.portal
        this.portalName = this.getPortalName(data.portal)
        this.emailVerifiedAt = data.email_verified_at
        this.phoneVerifiedAt = data.phone_verified_at
        this.createdAt = data.created_at
        this.updatedAt = data.updated_at
        this.token = data.token
        this.password = data.password
        this.rawData = data
    }

    getPortalName(portal) {
        switch (portal) {
            case 1:
                return 'tenant'
            case 2:
                return 'agent'
            case 3:
                return 'landlord'
            default:
                return 'unknown'
        }
    }

    /**
     * Get full user info as plain object
     */
    toJSON() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            name: this.name,
            email: this.email,
            phone: this.phone,
            portal: this.portal,
            portalName: this.portalName,
            emailVerifiedAt: this.emailVerifiedAt,
            phoneVerifiedAt: this.phoneVerifiedAt,
            token: this.token,
            password: this.password,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }
}
