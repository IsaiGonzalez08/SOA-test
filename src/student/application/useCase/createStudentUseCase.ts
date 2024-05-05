
import {Contact} from "../../domain/entity/contact";
import {StudentRepository} from "../../domain/repository/studentRepository";

export class CreateStudentUseCase {
    constructor(readonly repository:StudentRepository) {
    }

    async run(name:string,contactInfo:Contact){
        try {
            return await this.repository.create(name,contactInfo)
        }catch (e) {
            console.log("useCase error: ",e)
            return null;
        }
    }
}