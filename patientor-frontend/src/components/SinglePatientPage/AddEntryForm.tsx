import { useState } from "react";
import { EntryWithoutId } from "../../types";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import HealthCheckForm from "./HealthCheckForm";

interface Props {
  onSubmit: (values: EntryWithoutId, patientId: string) => void;
}

const AddEntryForm = ({ onSubmit }: Props) => {
  const Container = {
    borderStyle: "dotted",
    borderWidth: 2,
    marginBottom: 10,
    padding: 10,
  };

  const Selector = {
    marginTop: 10,
    marginBottom: 20,
  };

  const [form, setForm] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setForm(event.target.value);
  };

  let selectedForm = <></>;

  switch (form) {
    case "HealthCheckForm":
      selectedForm = <HealthCheckForm onSubmit={onSubmit} />;
      break;
    default:
      break;
  }

  return (
    <div style={Container}>
      <h3>Add new entry</h3>
      <InputLabel id="select-label">Entry type</InputLabel>
      <div style={Selector}>
        <Select
          labelId="select-label"
          id="select"
          value={form}
          label="entry-type"
          autoWidth
          onChange={handleChange}
        >
          <MenuItem value={"HealthCheckForm"}>Health Check</MenuItem>
        </Select>
      </div>
      {selectedForm}
    </div>
  );
};

export default AddEntryForm;
