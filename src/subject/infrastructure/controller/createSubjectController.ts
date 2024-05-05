import {Request,Response} from "express";
import {CreateSubjectUseCase} from "../../application/useCase/createSubjectUseCase";

export class CreateSubjectController{
    constructor(readonly useCase:CreateSubjectUseCase) {
    }

    async run(req:Request,res:Response){
        try {
            let {name, studentUuid} = req.body
            const subject = await this.useCase.run(name,studentUuid)
            if (subject){
                return res.status(201).send({
                    status:"success",
                    data:subject,
                    message:"subject creation successfully"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"subject creation failed"
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