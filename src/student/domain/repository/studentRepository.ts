import {Student} from "../entity/student";
import {Contact} from "../entity/contact";

export interface StudentRepository {
    getAll():Promise<Student[]|null>
    getAllFrom(tutorUuid:string):Promise<Student[]|any>
    create(
        name:string,
        contactInfo:Contact
    ):Promise<Student|null>
}