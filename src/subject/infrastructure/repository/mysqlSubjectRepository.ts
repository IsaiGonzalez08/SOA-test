import { Subject } from "../../domain/entity/subject";
import {SubjectRepository} from "../../domain/repository/subjectRepository";
import {Tutor} from "../../../tutor/domain/entity/tutor";
import {query} from "../../../database/mysql";
import {Contact} from "../../../tutor/domain/entity/contact";
import {Student} from "../../../student/domain/entity/student";


export class MysqlSubjectRepository implements SubjectRepository {

    async create(name: string, studentUuid: string): Promise<Subject | null> {
        try {
            let uuid = await this.generateSubjectUuid(name)
            const sql = "INSERT INTO subjects(uuid,name,student_uuid) VALUES(?,?,?)"
            const params:any[]=[uuid,name,studentUuid]
            const [result]:any = await query(sql,params)
            const subject = result[0]
            return new Subject(uuid,name,studentUuid,null)
        }catch (e) {
            console.log("repository error: ",e)
            return null;
        }
    }
    async getAllFrom(studentUuid: string): Promise<Subject[]|null> {
        try {
            const sql = "SELECT * FROM subjects WHERE student_uuid =? AND deleted_at IS NULL"
            const [result]:any = await query(sql,[studentUuid])
            return result.map((subjectData:any)=>{
                return new Subject(
                    subjectData.uuid,
                    subjectData.name,
                    subjectData.student_uuid,
                    null
                )
            })

        }catch (e) {
            console.log("repository error: ",e)
            return null;
        }
    }


    async setSubjectTo(subjectUuid: string, studentUuid: string): Promise<Subject | null> {
        try {
            let isValid = false
            const sql = "SELECT * FROM students WHERE uuid= ? AND deleted_at IS NULL"
            const [result]:any = await query(sql,[studentUuid])
            if (result.length>0){
                isValid=true
            }
            if (isValid) {
                const sql = "UPDATE subjects SET student_uuid=? WHERE uuid =? AND deleted_at IS NULL"
                const params: any[] = [studentUuid, subjectUuid]
                const [result]: any = await query(sql, params)
                const subject = result[0]
                console.log("uuid: ",studentUuid)
                return this.findById(subjectUuid)
            }
            return null
        }catch (e) {
            console.log("repository error: ", e)
            return null;
        }
    }





    async generateSubjectUuid(name: string):Promise<string|any>{
        try {
            let result
            do{
                const namePrefix = name.slice(0, 3).toLowerCase();
                const randomNumbers = Array.from({ length: 3 }, () =>
                    Math.floor(Math.random() * 10));
                result = '';
                for (let i = 0; i < 3; i++) {
                    result += namePrefix[i] + randomNumbers[i];
                }}while (await this.findById(result))

            return result;
        }catch (e){
            console.log(e)
        }
    }

    async findById(uuid: string): Promise<Tutor|any> {
        try {
            const sql ="SELECT * FROM subjects WHERE uuid = ? AND deleted_at IS NULL";
            const [result]:any = await query(sql,[uuid])

            const subject = result[0]

            return new Subject(subject.uuid,subject.name,subject.student_uuid,null)
        }catch (e) {
            console.log(e)
            return null
        }
    }



}