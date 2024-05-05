import express from "express";
import {createSubjectController, getSubjectController, setSubjectToController} from "../dependencies";

export const subjectRoute = express.Router();

subjectRoute.get("/:studentUuid", getSubjectController.run.bind(getSubjectController))
subjectRoute.post("/", createSubjectController.run.bind(createSubjectController))
subjectRoute.put("/:subjectUuid/assign", setSubjectToController.run.bind(setSubjectToController))