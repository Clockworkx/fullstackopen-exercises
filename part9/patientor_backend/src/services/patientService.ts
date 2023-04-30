import patients from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatient } from "../../types";
import { v4 as uuid } from "uuid";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getNonSensitivePatient = (
  sensitivePatient: Patient
): NonSensitivePatient => {
  const { id, name, dateOfBirth, gender, occupation } = sensitivePatient;
  return { id, name, dateOfBirth, gender, occupation };
};

const addPatient = (newPatient: NewPatient): NonSensitivePatient => {
  const patient = {
    id: uuid(),
    ...newPatient,
  };

  patients.push(patient);

  return getNonSensitivePatient(patient);
};

export default { getNonSensitivePatients, getPatients, addPatient };
