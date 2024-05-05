import {Contact} from "./contact";

export class Tutor{
    constructor(
        readonly uuid:string,
        readonly name:string,
        readonly contactInfo:Contact,
        readonly studentUuid:string|null,
        readonly deletedAt:Date|null,

    ) {
    }
}