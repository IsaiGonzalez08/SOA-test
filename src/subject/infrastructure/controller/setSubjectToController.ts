import {Request,Response} from "express";
import {SetSubjectToUseCase} from "../../application/useCase/setSubjectToUseCase";

export class SetSubjectToController{
    constructor(readonly useCase:SetSubjectToUseCase) {
    }

    async run(req:Request,res:Response){
        try {
            let subjectUuid=req.params.subjectUuid
            let {studentUuid} = req.body
            const subject = await this.useCase.run(subjectUuid,studentUuid)
            if (subject){
                return res.status(201).send({
                    status:"success",
                    data:subject,
                    message:"subject assignation successfully"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"subject assignation failed"
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