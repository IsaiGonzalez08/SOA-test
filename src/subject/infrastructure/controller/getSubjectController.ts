import {Request,Response} from "express";
import {GetSubjectUseCase} from "../../application/useCase/getSubjectUseCase";

export class GetSubjectController{
    constructor(readonly useCase:GetSubjectUseCase) {
    }

    async run(req:Request,res:Response){
        try {
            let studentUuid = req.params.studentUuid
            const subjects = await this.useCase.run(studentUuid)
            if (subjects){
                return res.status(200).send({
                    status:"success",
                    data:subjects,
                    message:"subjects got successfully"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"subject got failed"
            })
        }catch (e) {
            console.log("controller error: ",e)
            res.status(417).send({
                message:"error",
                error:e
            })
        }
    }
}