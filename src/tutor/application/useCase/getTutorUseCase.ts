import {TutorRepository} from "../../domain/repository/tutorRepository";
import {Contact} from "../../domain/entity/contact";

export class GetTutorUseCase{

    constructor(readonly repository:TutorRepository) {
    }

    async run(){
        try {
            return await this.repository.getAll()
        }catch (e) {
            console.log("useCase error: ",e)
            return null;
        }
    }
}