
export class Subject{
    constructor(
        readonly uuid:string,
        readonly name:string,
        readonly studentUuid:string|null,
        readonly deletedAt:Date|null
    ) {
    }
}