
import {CreateTutorUseCase} from "../application/useCase/createTutorUseCase";
import {GetTutorUseCase} from "../application/useCase/getTutorUseCase";
import {SetPupilUseCase} from "../application/useCase/setPupilUseCase";
import {SetPupilController} from "./controllers/setPupilController";
import {CreateTutorController} from "./controllers/createTutorController";
import {GetTutorController} from "./controllers/getTutorController";
import {MysqlTutorRepository} from "./repository/mysqlTutorRepository";

export const database = new MysqlTutorRepository()

export const createTutorUseCase = new CreateTutorUseCase(database)
export const createTutorController = new CreateTutorController(createTutorUseCase)


export const getTutorUseCase = new GetTutorUseCase(database)
export const getTutorController = new GetTutorController(getTutorUseCase)


export const setPupilUseCase = new SetPupilUseCase(database)
export const setPupilController = new SetPupilController(setPupilUseCase)

