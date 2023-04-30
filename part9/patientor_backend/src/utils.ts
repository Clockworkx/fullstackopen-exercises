import { NewPatient, Gender } from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("incorrect or missing name");
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("incorrect or missing date");
  }

  return date;
};

const isSSN = (ssn: string): string => {
  // validate with regex that ssn is of the correct form
  return ssn;
};

const parseSSN = (ssn: unknown) => {
  if (!ssn || !isString(ssn) || !isSSN(ssn)) {
    throw new Error("incorrect or missing ssn");
  }
  return ssn;
};

const isGender = (gender: string): gender is Gender => {
  console.log(Object.values(Gender));
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("incorrect or missing gender");
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("incorrect or missing occupation");
  }
  return occupation;
};

const toNewPatient = (body: unknown): NewPatient => {
  if (!body || typeof body !== "object") {
    throw new Error("body contains incorrect or missing data");
  }

  if (
    "name" in body &&
    "dateOfBirth" in body &&
    "ssn" in body &&
    "gender" in body &&
    "occupation" in body
  ) {
    const newPatient: NewPatient = {
      name: parseName(body.name),
      dateOfBirth: parseDate(body.dateOfBirth),
      ssn: parseSSN(body.ssn),
      gender: parseGender(body.gender),
      occupation: parseOccupation(body.occupation),
    };

    return newPatient;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export { toNewPatient };
