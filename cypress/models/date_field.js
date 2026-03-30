/**
 * DateField class to represent a date object returned by the API
 * Used for fields like due_at, created_at, disputed_at, next_due_at, etc.
 */
export class DateField {
    constructor(data) {
        this.raw = data?.raw ?? null
        this.formatted = data?.formatted ?? null
        this.diff = data?.diff ?? null
    }

    /**
     * Returns true if the date has a raw value
     */
    isSet() {
        return this.raw !== null
    }

    toJSON() {
        return {
            raw: this.raw,
            formatted: this.formatted,
            diff: this.diff
        }
    }
}
