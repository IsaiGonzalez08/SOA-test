import {SubjectRepository} from "../../domain/repository/subjectRepository";

export class CreateSubjectUseCase{
    constructor(readonly repository:SubjectRepository) {
    }

    async run(name:string,studentUuid:string){
        try {
            return await this.repository.create(name,studentUuid)
        }catch (e) {
            console.log("useCase error: ",e)
            return null;
        }
    }
}