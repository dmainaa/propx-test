export class DepartmentDistribution {
    constructor(data) {
        this.companyDepartmentId = data.company_department_id ?? null
        this.name = data.name ?? null
        this.total = data.total ?? 0
    }

    toJSON() {
        return {
            companyDepartmentId: this.companyDepartmentId,
            name: this.name,
            total: this.total
        }
    }
}
