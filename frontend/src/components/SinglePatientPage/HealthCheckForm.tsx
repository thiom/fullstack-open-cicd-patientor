import { MenuItem, InputLabel, Button, TextField } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, SyntheticEvent } from "react";
import { EntryWithoutId, Diagnosis } from "../../types";
import { useParams } from "react-router-dom";

interface Props {
  onSubmit: (values: EntryWithoutId, patientId: string) => void;
}

const HealthCheckForm = ({ onSubmit }: Props) => {
  const Field = {
    marginBottom: 10,
    marginTop: 10,
  };

  const [entryDate, setEntryDate] = useState<string>("");
  const [entryDescription, setEntryDescription] = useState<string>("");
  const [entrySpecialist, setEntrySpecialist] = useState<string>("");
  const [entryDiagnosisCodes, setEntryDiagnosisCodes] = useState<string>("");
  const [entryHealtCheckRating, setEntryHealtCheckRating] =
    useState<string>("");

  const id = useParams().id;

  const toDiagnosisCodesArray = (text: string): Array<Diagnosis["code"]> => {
    const codes: Array<Diagnosis["code"]> = text.split(",");
    return codes;
  };

  const addPatientEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const codes = toDiagnosisCodesArray(entryDiagnosisCodes);

    const entryWithoutId: EntryWithoutId = {
      date: entryDate,
      description: entryDescription,
      specialist: entrySpecialist,
      diagnosisCodes: codes,
      type: "HealthCheck",
      healthCheckRating: entryHealtCheckRating as unknown as number,
    };

    if (!id) return;

    onSubmit(entryWithoutId, id);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setEntryHealtCheckRating(event.target.value);
  };

  return (
    <>
      <form onSubmit={addPatientEntry}>
        <div style={Field}>
          <TextField
            label="Description"
            fullWidth
            value={entryDescription}
            onChange={({ target }) => setEntryDescription(target.value)}
          />
        </div>
        <div style={Field}>
          <TextField
            label="Date"
            fullWidth
            value={entryDate}
            onChange={({ target }) => setEntryDate(target.value)}
          />
        </div>
        <div style={Field}>
          <TextField
            label="Specialist"
            fullWidth
            value={entrySpecialist}
            onChange={({ target }) => setEntrySpecialist(target.value)}
          />
        </div>
        <div style={Field}>
          <TextField
            label="Diagnoses"
            fullWidth
            value={entryDiagnosisCodes}
            onChange={({ target }) => setEntryDiagnosisCodes(target.value)}
          />
        </div>
        <div style={Field}>
          <InputLabel id="select-label">Rating</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={entryHealtCheckRating}
            label="rating"
            onChange={handleChange}
          >
            <MenuItem value={0}>0: healthy</MenuItem>
            <MenuItem value={1}>1: low risk</MenuItem>
            <MenuItem value={2}>2: high risk</MenuItem>
            <MenuItem value={3}>3: critical risk</MenuItem>
          </Select>
        </div>
        <div style={Field}>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </div>
      </form>
    </>
  );
};

export default HealthCheckForm;
