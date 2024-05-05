import {Request,Response} from "express";
import {SetPupilUseCase} from "../../application/useCase/setPupilUseCase";

export class SetPupilController{
    constructor(readonly useCase:SetPupilUseCase) {
    }

    async run(req:Request,res:Response){
        try {
            let tutorUuid=req.params.tutorUuid
            let {studentUuid} = req.body
            const tutor = await this.useCase.run(tutorUuid,studentUuid)
            if (tutor){
                return res.status(200).send({
                    status:"success",
                    data:tutor,
                    message:"tutor created successfully"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"tutors creation failed"
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