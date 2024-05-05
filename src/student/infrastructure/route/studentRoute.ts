import express from "express";
import {createStudentController, getStudentController} from "../dependencies";

export const studentRoute = express.Router();

studentRoute.post("/", createStudentController.run.bind(createStudentController))
studentRoute.get("/:tutorUuid", getStudentController.runAllFrom.bind(getStudentController))
studentRoute.get("/", getStudentController.runAll.bind(getStudentController))