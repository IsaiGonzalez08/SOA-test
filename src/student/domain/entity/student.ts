import {Contact} from "./contact";

export class Student {
    //TODO: AT THE TIME TO ADD PUPIL IN TUTOR, SET HERE TOO THE TUTOR ID ---- LIKE A 1-1 CONNECTION
    constructor(
        readonly uuid:string,
        readonly name:string,
        readonly contactInfo:Contact,
        readonly tutorUuid:string|null,
        readonly deletedAt:Date|null,
    ) {
    }
}