import express from "express";
import { Request, Response } from "express";
import patientService from "../services/patientService";
import { toNewPatient, toEntryWithoutId } from "../utils";

const router = express.Router();

const handleError = (error: unknown, res: Response) => {
  let errorMessage = "Error: ";

  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
  res.status(400).send({ error: errorMessage });
};

router.get("/:id", (req, res) => {
  try {
    res.send(patientService.getPatientById(req.params.id));
  } catch (error: unknown) {
    handleError(error, res);
  }
});

router.get("/", (_req: Request, res: Response) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post("/", (req: Request, res: Response) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.send(addedPatient);
  } catch (error: unknown) {
    handleError(error, res);
  }
});

router.post("/:id/entries", (req: Request, res: Response) => {
  try {
    const newEntryWithoutId = toEntryWithoutId(req.body);
    const id = req.params.id;
    const newEntry = patientService.addEntry(newEntryWithoutId, id);
    res.json(newEntry);
  } catch (error: unknown) {
    handleError(error, res);
  }
});

export default router;
