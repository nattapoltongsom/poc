export class Entity {
    protected id!: string
    private createdDate: Date
    private updatedDate: Date

    constructor() {
        const timestamp = new Date()
        this.createdDate = timestamp
        this.updatedDate = timestamp
    }

    public getId(): string {
        return this.id
    }
    protected setId(id: string) {
        this.id = id
    }

    public getCreatedDate(): Date {
        return this.createdDate
    }
    public setCreatedDate(value: Date) {
        this.createdDate = value
    }

    public getUpdatedDate(): Date {
        return this.updatedDate
    }
    public setUpdatedDate(value: Date) {
        this.updatedDate = value
    }
}
