import {Tutor} from "../entity/tutor";
import {Contact} from "../entity/contact";

export interface TutorRepository{
    getAll():Promise<Tutor[]|null>
    create(
        name:string,
        contactInfo:Contact
    ):Promise<Tutor|null>
    setPupil(tutorUuid:string,studentUuid:string):Promise<Tutor|null>

}