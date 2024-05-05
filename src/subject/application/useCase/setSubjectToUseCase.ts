import {SubjectRepository} from "../../domain/repository/subjectRepository";

export class SetSubjectToUseCase{
    constructor(readonly repository:SubjectRepository) {
    }

    async run(subjectUuid:string,studentUuid:string){
        try {
            return await this.repository.setSubjectTo(subjectUuid,studentUuid)
        }catch (e) {
            console.log("useCase error: ",e)
            return null;
        }
    }
}