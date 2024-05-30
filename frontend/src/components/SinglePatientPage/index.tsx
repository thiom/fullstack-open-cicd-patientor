import { Patient, Diagnosis, Entry, EntryWithoutId } from "../../types";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnoses";
import PatientEntry from "./PatientEntry";
import AddEntryForm from "./AddEntryForm";
import axios from "axios";

type Params = {
  id: string | undefined;
};

const Error = {
  border: "dotted",
  borderColor: "red",
  marginBottom: 10,
  padding: 5,
  paddingLeft: 10,
  color: "red",
};

const SinglePatientPage = () => {
  const [patient, setPatient] = useState<Patient | undefined>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const { id } = useParams<Params>();

  useEffect(() => {
    const fetchPatient = async (id: string | undefined) => {
      if (!id) return;
      const patient = await patientService.getById(id);
      setPatient(patient);
    };

    const fetchDiagnoses = async () => {
      const diagnosisList = await diagnoseService.getAll();
      setDiagnoses(diagnosisList);
    };

    void fetchPatient(id);
    void fetchDiagnoses();
    if (patient) setEntries(patient.entries);
  }, [patient, id]);

  if (!patient) {
    return (
      <>
        <h2>No patient found</h2>
      </>
    );
  }

  const patientEntries = entries.map((entry) => PatientEntry(entry, diagnoses));
  let genderIcon;

  switch (patient.gender) {
    case "male":
      genderIcon = <MaleIcon />;
      break;
    case "female":
      genderIcon = <FemaleIcon />;
      break;
    default:
      genderIcon = <TransgenderIcon />;
      break;
  }

  const submitEntry = async (values: EntryWithoutId, id: string) => {
    try {
      const entry = await patientService.createEntry(values, id);
      setEntries(entries.concat(entry));
      setErrorMessage(undefined);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        let errorMsg = "Error: ";
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          errorMsg = error.response.data.error;
        }
        setErrorMessage(errorMsg);
      }
    }
  };

  return (
    <>
      <h2>
        {patient.name} {genderIcon}
      </h2>
      <p>
        ssn: {patient.ssn}
        <br />
        occupation: {patient.occupation}
      </p>
      {errorMessage && (
        <div style={Error}>
          <p>{errorMessage}</p>
        </div>
      )}
      <AddEntryForm onSubmit={submitEntry} />
      <h3>entries</h3>
      <ul style={{ listStyle: "none" }}>{patientEntries}</ul>
    </>
  );
};

export default SinglePatientPage;
