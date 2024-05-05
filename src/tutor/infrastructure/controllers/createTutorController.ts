import {Request,Response} from "express";
import {CreateTutorUseCase} from "../../application/useCase/createTutorUseCase";
import {Contact} from "../../domain/entity/contact";

export class CreateTutorController{
    constructor(readonly useCase:CreateTutorUseCase) {
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
                    message:"tutor creation successfully"
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