import {TutorRepository} from "../../domain/repository/tutorRepository";

export class SetPupilUseCase{
    constructor(readonly repository:TutorRepository) {
    }

    async run(tutorUuid:string,studentUuid:string){
        try {
            return await this.repository.setPupil(tutorUuid,studentUuid)
        }catch (e) {
            console.log("useCase error: ",e)
            return null;
        }
    }
}