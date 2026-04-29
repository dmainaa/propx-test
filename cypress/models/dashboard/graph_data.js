class GraphDataPoint {
    constructor(data) {
        this.label = data.label ?? null
        this.value = data.value ?? null
    }

    toJSON() {
        return {
            label: this.label,
            value: this.value
        }
    }
}

export class GraphData {
    constructor(data) {
        this.data = Array.isArray(data.data)
            ? data.data.map(p => new GraphDataPoint(p))
            : []
        this.topRightLabel = data.top_right_label ?? null
        this.minValue = data.min_value ?? null
        this.maxValue = data.max_value ?? null
    }

    toJSON() {
        return {
            data: this.data.map(p => p.toJSON()),
            topRightLabel: this.topRightLabel,
            minValue: this.minValue,
            maxValue: this.maxValue
        }
    }
}
