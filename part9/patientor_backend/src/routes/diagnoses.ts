import express from "express";
import diagnosisService from "../services/diagnosisService";

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_request, response) => {
  const diagnoses = diagnosisService.getDiagnoses();
  response.json(diagnoses);
});

export default diagnosesRouter;
