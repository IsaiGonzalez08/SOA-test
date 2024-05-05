import {TutorRepository} from "../../domain/repository/tutorRepository";
import {Contact} from "../../domain/entity/contact";

export class CreateTutorUseCase{
    constructor(readonly repository:TutorRepository) {
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