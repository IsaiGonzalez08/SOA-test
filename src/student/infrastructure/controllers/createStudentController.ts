import {Request,Response} from "express";
import {Contact} from "../../domain/entity/contact";
import {CreateStudentUseCase} from "../../application/useCase/createStudentUseCase";

export class CreateStudentController {
    constructor(readonly useCase:CreateStudentUseCase) {
    }

    async run(req:Request,res:Response){
        try {
            let {name} = req.body
            let {address,phoneNumber,email} = req.body.contact
            const contactInfo = new Contact(address,phoneNumber,email)
            const tutor = await this.useCase.run(name,contactInfo)
            if (tutor){
                return res.status(201).send({
                    status:"success",
                    data:tutor,
                    message:"student got successfully"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"student got failed"
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