import { Typography } from "@mui/material";
import {WorkOutlined} from '@mui/icons-material';
import {MedicalServices} from '@mui/icons-material';
import {LocalHospital} from '@mui/icons-material';
import type { Entry, Diagnosis } from "../../types";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

interface BaseProps {
    diagnoses: Diagnosis[] | undefined;
}

interface DiagnosisListProps extends BaseProps {
    diagnosisCodes: string[] | undefined;
}

interface HealthCheckEntryProps extends BaseProps {
    entry: HealthCheckEntry;
}


interface HospitalEntryProps extends BaseProps {
    entry: HospitalEntry;
}

interface OccupationalHealthcareEntryProps extends BaseProps {
    entry: OccupationalHealthcareEntry;
}

interface EntryProps extends BaseProps {
    entry: Entry | undefined | null;
}

const DiagnosisList = ({diagnosisCodes, diagnoses}: DiagnosisListProps) => {
    if (!diagnosisCodes || diagnosisCodes.length === 0) return null;
    return (
        <ul>
            { diagnosisCodes.map(c => (
                <li key={c}>
                    <Typography variant="body2">{c} {diagnoses?.find(d => d.code === c)?.name}</Typography>
                </li>
            ))}
        </ul>
    )
}

const HealthCheck = ({entry, diagnoses} : HealthCheckEntryProps) => {
    return (
        <>
            <Typography variant='body2'>
                {entry.date} <MedicalServices />
            </Typography>
            <Typography variant="body2"><i>{entry.description}</i></Typography>
            <Typography>{entry.healthCheckRating}</Typography>
            <DiagnosisList diagnoses={diagnoses} diagnosisCodes={entry.diagnosisCodes} />                        
        </>
    )
}

const Hospital = ({entry, diagnoses} : HospitalEntryProps) => {
    return (
        <>
            <Typography variant='body2'>
                {entry.date} <LocalHospital />
            </Typography>
            <Typography variant="body2"><i>{entry.description}</i></Typography>
            <DiagnosisList diagnoses={diagnoses} diagnosisCodes={entry.diagnosisCodes} />
            <Typography variant="body2">Discharge: {entry.discharge.date} {entry.discharge.criteria}</Typography>
            
        </>
    )
}

const OccupationalHealthcare = ({entry, diagnoses} : OccupationalHealthcareEntryProps) => {
    return (
        <>
            <Typography variant='body2'>
                {entry.date} <WorkOutlined /> {entry.employerName}
            </Typography>
            <Typography variant="body2"><i>{entry.description}</i></Typography>
            <DiagnosisList diagnoses={diagnoses} diagnosisCodes={entry.diagnosisCodes} />
            <Typography variant="body2">{entry.sickLeave && `Sick Leave: ${entry.sickLeave?.startDate} - ${entry.sickLeave?.endDate}`}</Typography>
            
        </>
    )
}

const EntryLine = ({entry, diagnoses} : EntryProps) => {
    if (!entry) return null;

    const renderEntry = () => {
        switch (entry.type) {
            case 'HealthCheck': 
                return (<HealthCheck entry={entry} diagnoses={diagnoses} />);
            case "Hospital":
                return (<Hospital entry={entry} diagnoses={diagnoses} />);
            case "OccupationalHealthcare":
                return (<OccupationalHealthcare entry={entry} diagnoses={diagnoses} />);
            default:
                return assertNever(entry);
        }   
    };

    return (
        <div style={{
            border: '1px solid black',
            borderRadius: '0.25rem',
            padding: '2px',
            margin: '10px 0'
        }}>
            {renderEntry()}
            <Typography variant='body2'>diagnosed by {entry.specialist}</Typography>
        </div>
    );
};

export default EntryLine;