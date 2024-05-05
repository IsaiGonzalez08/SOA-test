import {MysqlSubjectRepository} from "./repository/mysqlSubjectRepository";
import {CreateSubjectUseCase} from "../application/useCase/createSubjectUseCase";
import e from "express";
import {CreateSubjectController} from "./controller/createSubjectController";
import {GetSubjectUseCase} from "../application/useCase/getSubjectUseCase";
import {GetSubjectController} from "./controller/getSubjectController";
import {SetSubjectToUseCase} from "../application/useCase/setSubjectToUseCase";
import {SetSubjectToController} from "./controller/setSubjectToController";

export const database=new MysqlSubjectRepository()

export const createSubjectUseCase=new CreateSubjectUseCase(database)
export const createSubjectController=new CreateSubjectController(createSubjectUseCase)

export const getSubjectUseCase=new GetSubjectUseCase(database)
export const getSubjectController=new GetSubjectController(getSubjectUseCase)

export const setSubjectToUseCase = new SetSubjectToUseCase(database)
export const setSubjectToController= new SetSubjectToController(setSubjectToUseCase)