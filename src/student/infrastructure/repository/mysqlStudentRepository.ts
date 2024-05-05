
import {query} from "../../../database/mysql";
import {Contact} from "../../domain/entity/contact";
import {StudentRepository} from "../../domain/repository/studentRepository";
import {Student} from "../../domain/entity/student";

export class MysqlStudentRepository implements StudentRepository{
    async getAllFrom(tutorUuid: string): Promise<Student[]|null> {
        try {
            const sql = "SELECT * FROM students WHERE tutor_uuid =? AND deleted_at IS NULL"
            const [result]:any = await query(sql,[tutorUuid])
            return result.map((studentData:any)=>{
                return new Student(
                    studentData.uuid,
                    studentData.name,
                    new Contact(studentData.address,studentData.phone_number,studentData.email),
                    studentData.tutor_uuid,
                    null
                )
            })

        }catch (e) {
            console.log("repository error: ",e)
            return null;
        }
    }

    async getAll(): Promise<Student[] | null> {
        try {
            const sql = "SELECT * FROM students WHERE deleted_at IS NULL"
            const [result]:any = await query(sql,[])
            return result.map((studentData:any)=>{
                return new Student(
                    studentData.uuid,
                    studentData.name,
                    new Contact(studentData.address,studentData.phone_number,studentData.email),
                    studentData.tutor_uuid,
                    null
                )
            })

        }catch (e) {
            console.log("repository error: ",e)
            return null;
        }
    }
    async create(name: string, contactInfo: Contact): Promise<Student | null> {
        try {
            let uuid = await this.generateStudentUuid(name)
            const sql = "INSERT INTO students(uuid,name,address,phone_number,email) VALUES(?,?,?,?,?)"
            const params:any[]=[uuid,name,contactInfo.address,contactInfo.phoneNumber,contactInfo.email]
            const [result]:any = await query(sql,params)
            const student = result[0]
            return new Student(uuid,name,contactInfo,null,null)
        }catch (e) {
            console.log("repository error: ",e)
            return null;
        }
    }



    async generateStudentUuid(name: string):Promise<string|any>{
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

    async findById(uuid: string): Promise<Student|any> {
        try {
            const sql ="SELECT * FROM tutors WHERE uuid = ? AND deleted_at IS NULL";
            const params:any[]=[uuid]
            const [result]:any = await query(sql,params)

            const student = result[0]
            const contactInfo = new Contact(student.address,student.phone_number,student.email)

            return new Student(student.uuid,student.name,contactInfo,student.tutor_uuid,null)
        }catch (e) {
            console.log(e)
            return null
        }
    }

}