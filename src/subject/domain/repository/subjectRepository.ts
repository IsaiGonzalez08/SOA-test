import {Subject} from "../entity/subject";

export interface SubjectRepository{
    create(name:string,studentUuid:string):Promise<Subject|null>
    getAllFrom(studentUuid:string):Promise<Subject[]|null>
    setSubjectTo(subjectUuid:string,studentUuid:string):Promise<Subject|null>

}