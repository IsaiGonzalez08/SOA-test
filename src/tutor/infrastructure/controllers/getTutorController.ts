import {Request,Response} from "express";
import {GetTutorUseCase} from "../../application/useCase/getTutorUseCase";

export class GetTutorController {
    constructor(readonly useCase:GetTutorUseCase) {
    }

    async run(req:Request,res:Response){
        try {
            const tutors = await this.useCase.run()
            if (tutors){
                return res.status(200).send({
                    status:"success",
                    data:tutors,
                    message:"tutors got successfully"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"tutors got failed"
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