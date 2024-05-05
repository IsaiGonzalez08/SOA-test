import {SubjectRepository} from "../../domain/repository/subjectRepository";

export class GetSubjectUseCase{
    constructor(readonly repository:SubjectRepository) {
    }

    async run(studentUuid:string){
        try {
            return await this.repository.getAllFrom(studentUuid)
        }catch (e) {
            console.log("useCase error: ",e)
            return null;
        }
    }
}