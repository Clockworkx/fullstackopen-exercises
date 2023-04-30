interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

//type Gender = "male" | "female" | "other";
enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

type NonSensitivePatient = Omit<Patient, "ssn">;

type NewPatient = Omit<Patient, "id">;

export { Diagnosis, Patient, NonSensitivePatient, NewPatient, Gender };
