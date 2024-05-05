import {Tutor} from "../../domain/entity/tutor";
import {query} from "../../../database/mysql";
import {Contact} from "../../domain/entity/contact";
import {TutorRepository} from "../../domain/repository/tutorRepository";

export class MysqlTutorRepository implements TutorRepository{

    async getAll(): Promise<Tutor[] | null> {
        try {
            const sql = "SELECT * FROM tutors WHERE deleted_at IS NULL"
            const [result]:any = await query(sql,[])
            return result.map((tutorData:any)=>{
                console.log(tutorData)
                let contact
                return new Tutor(
                    tutorData.uuid,
                    tutorData.name,
                    contact=new Contact(tutorData.address,tutorData.phone_number,tutorData.email),
                    tutorData.student_uuid,
                    null
                )
            })

        }catch (e) {
            console.log("repository error: ",e)
            return null;
        }
    }
    async create(name: string, contactInfo: Contact): Promise<Tutor | null> {
        //TODO ADD SAME FIXES TO STUDENT
        try {

            let uuid = await this.generateTutorUuid(name)
            const sql = "INSERT INTO tutors(uuid,name,address,phone_number,email) VALUES(?,?,?,?,?)"
            const params:any[]=[uuid,name,contactInfo.address,contactInfo.phoneNumber,contactInfo.email]
            const [result]:any = await query(sql,params)
            const tutor = result[0]
            console.log("result:\n",tutor)
            return new Tutor(uuid,name,contactInfo,null,null)
        }catch (e) {
            console.log("repository error: ",e)
            return null;
        }
    }

    async setPupil(tutorUuid: string, studentUuid: string): Promise<Tutor | null> {
        try {
            let isValid = false
            const sql = "SELECT * FROM students WHERE uuid= ? AND deleted_at IS NULL"
            const [result]:any = await query(sql,[studentUuid])
            if (result.length>0){
                const sql = "UPDATE students SET tutor_uuid=? WHERE uuid =? AND deleted_at IS NULL"
                const params: any[] = [tutorUuid,studentUuid]
                const [result]: any = await query(sql, params)
                isValid=true
            }
            if (isValid) {
                let sql:string = "UPDATE tutors SET student_uuid=? WHERE uuid =? AND deleted_at IS NULL"
                let params: any[] = [studentUuid, tutorUuid]
                let [result]: any = await query(sql, params)
                sql="SELECT * FROM tutors WHERE uuid=? AND deleted_at IS NULL";
                const [result2]:any=await query(sql,[tutorUuid])
                const tutor = result2[0]
                const contactInfo = new Contact(tutor.address, tutor.phone_number, tutor.email)
                return new Tutor(tutor.uuid, tutor.name, contactInfo, tutor.student_uuid, null)
            }
            return null
        }catch (e) {
            console.log("repository error: ", e)
            return null;
        }
    }


    async generateTutorUuid(name: string):Promise<string|any>{
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
            const sql ="SELECT * FROM tutors WHERE uuid = ? AND deleted_at IS NULL";
            const params:any[]=[uuid]
            const [result]:any = await query(sql,params)

            const tutor = result[0]
            const contactInfo = new Contact(tutor.address,tutor.phone_number,tutor.email)

            return new Tutor(tutor.uuid,tutor.name,contactInfo,tutor.student_uuid,null)
        }catch (e) {
            console.log(e)
            return null
        }
    }

}