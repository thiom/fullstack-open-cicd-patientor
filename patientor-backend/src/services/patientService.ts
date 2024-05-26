import patientData from "../../data/patients-full";
import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  Entry,
  EntryWithoutId,
} from "../types";
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientData;

const getPatientById = (id: string): Patient => {
  const patient = patients.find((entry) => entry.id === id);

  if (patient) {
    return patient;
  } else {
    throw new Error("No patient found with with given id");
  }
};

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

const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();
  const newPatient = {
    id,
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (entry: EntryWithoutId, patientId: string): Entry => {
  const id: string = uuid();
  const newPatientEntry: Entry = {
    id: id,
    ...entry,
  };
  getPatientById(patientId).entries.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatientById,
  getPatients,
  getNonSensitivePatients,
  addPatient,
  addEntry,
};
