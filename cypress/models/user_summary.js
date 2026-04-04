/**
 * UserSummary class to represent a lightweight user object returned by the API
 * Used for fields like paying_user, receiving_user, etc.
 */
export class UserSummary {
    constructor(data) {
        this.id = data.id
        this.name = data.name ?? null
        this.profilePhotoUrl = data.profile_photo_url ?? null
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            profilePhotoUrl: this.profilePhotoUrl
        }
    }
}
