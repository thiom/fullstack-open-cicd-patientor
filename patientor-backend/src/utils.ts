/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EntryWithoutId,
  Diagnosis,
  Discharge,
  HospitalEntry,
  OccupationalHealthcareEntry,
  SickLeave,
  HealthCheckEntry,
  HealthCheckRating,
  Gender,
  NewPatient,
} from "./types";

export const toNewPatient = (object: any): NewPatient => {
  if (!object || typeof object != "object") {
    throw new Error("Missing data");
  } else if (
    !("name" in object) ||
    !("gender" in object) ||
    !("dateOfBirth" in object) ||
    !("ssn" in object)
  ) {
    throw new Error("Missing fields");
  } else {
    const newPatient = {
      name: parseText(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseText(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseText(object.occupation),
      entries: [],
    };
    return newPatient;
  }
};

export const toEntryWithoutId = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Missing data");
  } else if (
    !("type" in object) ||
    !isString(object.type) ||
    !("date" in object) ||
    !("description" in object) ||
    !("specialist" in object) ||
    !("specialist" in object) ||
    !("diagnosisCodes" in object)
  ) {
    throw new Error("Missing fields");
  }

  switch (object.type) {
    case "Hospital":
      if ("discharge" in object) {
        const hospitalEntry: Omit<HospitalEntry, "id"> = {
          date: parseDate(object.date),
          description: parseText(object.description),
          specialist: parseText(object.specialist),
          diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
          type: "Hospital",
          discharge: parseDischarge(object.discharge),
        };
        return hospitalEntry as EntryWithoutId;
      }
      break;
    case "OccupationalHealthcare":
      if ("employerName" in object && "sickLeave" in object) {
        const occupationalEntry: Omit<OccupationalHealthcareEntry, "id"> = {
          date: parseDate(object.date),
          description: parseText(object.description),
          specialist: parseText(object.specialist),
          diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
          type: "OccupationalHealthcare",
          employerName: parseText(object.employerName),
          sickLeave: parseSickLeave(object.sickLeave),
        };
        return occupationalEntry as EntryWithoutId;
      }
      break;
    case "HealthCheck":
      if ("healthCheckRating" in object) {
        const healthCheckENtry: Omit<HealthCheckEntry, "id"> = {
          date: parseDate(object.date),
          description: parseText(object.description),
          specialist: parseText(object.specialist),
          diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
          type: "HealthCheck",
          healthCheckRating: parseHealtCheckRating(object.healthCheckRating),
        };
        return healthCheckENtry as EntryWithoutId;
      }
      break;
  }
  throw new Error("Missing fields");
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object") {
    return [] as Array<Diagnosis["code"]>;
  }
  return object as Array<Diagnosis["code"]>;
};

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== "object") {
    throw new Error("Invalid discharge");
  }
  if ("date" in object && "criteria" in object) {
    const discharge: Discharge = {
      date: parseDate(object.date),
      criteria: parseText(object.criteria),
    };
    return discharge;
  }
  throw new Error("Invalid discharge");
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== "object") {
    throw new Error("Invalid sick leave");
  }
  if ("startDate" in object && "endDate" in object) {
    const sickleave: SickLeave = {
      startDate: parseDate(object.startDate),
      endDate: parseDate(object.endDate),
    };
    return sickleave;
  }
  throw new Error("Invalid sick leave");
};

const parseHealtCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isNumber(rating)) {
    throw new Error("Invalid rating (not a number): " + rating);
  } else if (Object.values(HealthCheckRating).includes(rating)) {
    return rating;
  } else {
    throw new Error("Invalid rating (must be between 0 - 3): " + rating);
  }
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !Date.parse(date)) {
    throw new Error("Invalid date: " + date);
  }
  return date;
};

const parseText = (text: unknown): string => {
  if (!isString(text)) {
    throw new Error("Invalid field");
  }
  return text;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Invalid gender: " + gender);
  }
  return gender;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((item) => item.toString())
    .includes(param);
};

const isNumber = (num: unknown): num is number => {
  return typeof num === "number" || num instanceof Number;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};
