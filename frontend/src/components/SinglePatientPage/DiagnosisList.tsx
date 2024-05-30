import { Entry, Diagnosis } from "../../types";

type Props = {
  entry: Entry;
  diagnoses: Diagnosis[];
};

const DiagnosisList = ({ entry, diagnoses }: Props) => {
  const findName = (code: string): string | undefined => {
    const diagnosisByCode = diagnoses.find((d) => d.code === code);
    if (!diagnosisByCode) return;
    return diagnosisByCode.name;
  };

  return (
    <>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((diagnosis) => (
            <li key={diagnosis}>
              <p>
                {diagnosis} {findName(diagnosis)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default DiagnosisList;
