
import {StudentRepository} from "../../domain/repository/studentRepository";

export class GetStudentUseCase {

    constructor(readonly repository:StudentRepository) {
    }

    async runAll(){
        try {
            return await this.repository.getAll()
        }catch (e) {
            console.log("useCase error: ",e)
            return null;
        }
    }

    async runByTutor(tutorUuid:string){
        try {
            return await this.repository.getAllFrom(tutorUuid)
        }catch (e) {
            console.log("useCase error: ",e)
            return null;
        }
    }
}