import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";
import { Patient } from "./types";
import PatientListPage from "./components/PatientListPage";
import SinglePatientPage from "./components/SinglePatientPage";
import patientService from "./services/patients";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  const fetchPatientList = async () => {
    const patients = await patientService.getAll();
    setPatients(patients);
  };

  useEffect(() => {
    void fetchPatientList();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route
              path="/"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route path="/patients/:id" element={<SinglePatientPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
