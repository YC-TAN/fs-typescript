import { Typography } from "@mui/material";
import type { Entry, Diagnosis } from "../../types";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

interface EntryProps {
    entry: Entry | undefined | null;
    diagnoses: Diagnosis[];
}

const EntryLine = ({entry, diagnoses} : EntryProps) => {
    if (!entry) return null;

    const renderEntry = () => {
        switch (entry.type) {
            case 'HealthCheck': 
                return (
                    <>
                    <p></p>
                    </>
                );
            case "Hospital":
                return (
                    <>
                    <p></p>
                    </>
                );
            case "OccupationalHealthcare":
                return (
                    <>
                    <p></p>
                    </>
                );
            default:
                return assertNever(entry);
        }   
    };
  return (
    <div>
        <Typography variant='body2'>{entry.date} <i>{entry.description}</i></Typography>
        <ul>
            { entry.diagnosisCodes?.map(c => (
                <li key={c}>
                    <Typography variant="body2">{c} {diagnoses?.find(d => d.code === c)?.name}</Typography>
                    </li>
            ))}
        </ul>
        {renderEntry()}
    </div>
  );
};

export default EntryLine;