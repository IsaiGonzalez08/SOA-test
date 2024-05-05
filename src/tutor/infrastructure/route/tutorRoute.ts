import express from "express";
import {createTutorController, getTutorController, setPupilController} from "../dependencies";

export const tutorRoute = express.Router();

tutorRoute.get("/",getTutorController.run.bind(getTutorController))
tutorRoute.put("/:tutorUuid/assign", setPupilController.run.bind(setPupilController))
tutorRoute.post("/", createTutorController.run.bind(createTutorController))