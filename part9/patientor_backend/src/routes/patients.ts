import express from "express";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils";

const patientsRouter = express.Router();

patientsRouter.get("/", (_request, response) => {
  const patients = patientService.getNonSensitivePatients();
  response.json(patients);
});

patientsRouter.post("/", (request, response) => {
  // parse request body to new Patient

  try {
    const newPatient = toNewPatient(request.body); // patient without id

    const addedPatient = patientService.addPatient(newPatient); // patient with id

    response.json(addedPatient);
    console.log(request.body);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    response.status(400).send(errorMessage);
  }
});

export default patientsRouter;
