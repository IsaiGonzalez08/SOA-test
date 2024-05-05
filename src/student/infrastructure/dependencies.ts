import {MysqlStudentRepository} from "./repository/mysqlStudentRepository";
import {CreateStudentUseCase} from "../application/useCase/createStudentUseCase";
import {CreateStudentController} from "./controllers/createStudentController";
import {GetStudentUseCase} from "../application/useCase/getStudentUseCase";
import {GetStudentController} from "./controllers/getStudentController";


export const database = new MysqlStudentRepository()

export const createStudentUseCase = new CreateStudentUseCase(database)
export const createStudentController = new CreateStudentController(createStudentUseCase)

export const getStudentUseCase = new GetStudentUseCase(database)
export const getStudentController = new GetStudentController(getStudentUseCase)