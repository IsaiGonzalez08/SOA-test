import {Request,Response} from "express";
import {GetStudentUseCase} from "../../application/useCase/getStudentUseCase";


export class GetStudentController {
    constructor(readonly useCase:GetStudentUseCase) {
    }

    async runAll(req:Request,res:Response){
        try {
            const students = await this.useCase.runAll()
            if (students){
                return res.status(200).send({
                    status:"success",
                    data:students,
                    message:"students got successfully"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"students got failed"
            })

        }catch (e) {
            console.log("controller error: ",e)
            res.status(417).send({
                message:"error",
                error:e
            })
        }
    }

    async runAllFrom(req:Request,res:Response){
        try {
            let tutorUuid=req.params.tutorUuid
            const students = await this.useCase.runByTutor(tutorUuid)
            if (students){
                return res.status(200).send({
                    status:"success",
                    data:students,
                    message:"students got successfully"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"students got failed"
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