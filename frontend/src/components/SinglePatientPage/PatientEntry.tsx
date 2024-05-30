import { Diagnosis, Entry } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CheckIcon from "@mui/icons-material/Check";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import DiagnosisList from "./DiagnosisList";

const PatientEntry = (entry: Entry, diagnoses: Diagnosis[]) => {
  const Container = {
    borderStyle: "solid",
    borderWidth: 2,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  };

  switch (entry.type) {
    case "HealthCheck":
      return (
        <li key={entry.id}>
          <div style={Container}>
            <p>
              {entry.date} <CheckIcon />
            </p>
            <p>
              <i>{entry.description}</i>
            </p>
            <DiagnosisList entry={entry} diagnoses={diagnoses} />
            <p>diagnose by {entry.specialist}</p>
          </div>
        </li>
      );
    case "OccupationalHealthcare":
      return (
        <li key={entry.id}>
          <div style={Container}>
            <p>
              {entry.date} <HealthAndSafetyIcon /> {entry.employerName}
            </p>
            <p>
              <i>{entry.description}</i>
            </p>
            <DiagnosisList entry={entry} diagnoses={diagnoses} />
            <p>diagnose by {entry.specialist}</p>
          </div>
        </li>
      );
    case "Hospital":
      return (
        <li key={entry.id}>
          <div style={Container}>
            <p>
              {entry.date} <LocalHospitalIcon />
            </p>
            <p>
              <i>{entry.description}</i>
            </p>
            <DiagnosisList entry={entry} diagnoses={diagnoses} />
            <p>diagnose by {entry.specialist}</p>
          </div>
        </li>
      );
    default:
      return;
  }
};

export default PatientEntry;
