import { useState, type SyntheticEvent, type ChangeEvent } from "react";
import axios from "axios";
import { 
    Typography, 
    TextField, 
    Button,
    Alert,
    MenuItem,
} from "@mui/material";
import { 
    Discharge, 
    EntryType, 
    EntryWithoutId, 
    HealthCheckRating, 
    SickLeave 
} from "../../types";

import HealthCheckForm from "./HealthCheckForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import HospitalForm from "./HospitalForm";

interface EntryFormProps {
    addEntry: (values: EntryWithoutId) => Promise<void>,
    onCancel: () => void,
}

const EntryTypeLabel: Record<EntryType, string> = {
    HealthCheck: 'Health Check',
    Hospital: 'Hospital',
    OccupationalHealthcare: 'Occupational Healthcare',
};

const EntryForm = ({addEntry, onCancel}: EntryFormProps) => {
    // Base form
    const [type, setType] = useState<EntryType>('HealthCheck');
    const [date, setDate] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');    
    const [diagnosisCodes, setDiagnosisCodes] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    // Health Check
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);

    // Occupational Healthcare
    const [sickLeave, setSickLeave] = useState<SickLeave | null>(null);
    const [employerName, setEmployerName] = useState<string>('');

    // Hospital
    const [discharge, setDischarge] = useState<Discharge | null>(null);

    const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if ((Object.keys(EntryTypeLabel) as string[]).includes(value)) {
            setType(value as EntryType);
        }
    };

    const renderForm = () => {
        switch (type) {
            case 'HealthCheck':
                return (<HealthCheckForm
                    healthCheckRating={healthCheckRating}
                    setHealthCheckRating={setHealthCheckRating}
                />);
            case 'Hospital':
                return (<HospitalForm 
                    discharge={discharge}
                    setDischarge={setDischarge}
                />);
            case 'OccupationalHealthcare':
                return (<OccupationalHealthcareForm   
                    employerName={employerName}
                    setEmployerName={setEmployerName}
                    sickLeave={sickLeave}
                    setSickLeave={setSickLeave}
                />);
            default:
                throw new Error('unknown type');
        }
    };

    const onSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        try {
            const baseEntry = {
                description,
                date,
                specialist,
                ...(diagnosisCodes && { diagnosisCodes: diagnosisCodes.split(', ') }),
            };
            let newEntry: EntryWithoutId;
            setError(null);
            switch (type) {
                case 'HealthCheck':
                    newEntry = {
                        ...baseEntry,
                        type: 'HealthCheck',
                        healthCheckRating
                    };
                    await addEntry(newEntry);
                    break;
                case 'Hospital':
                    if (!discharge) {
                        setError('Discharge is required');
                        return;
                    }
                    newEntry = { ...baseEntry, type: 'Hospital', discharge };
                    await addEntry(newEntry);
                    break;
                case 'OccupationalHealthcare':
                    newEntry = {
                        ...baseEntry,
                        type: 'OccupationalHealthcare',
                        employerName,
                        ...(sickLeave && {sickLeave})
                    };
                    await addEntry(newEntry);
                    break;
                default:
                    throw new Error('unknown type');
            }
            setDate('');
            setDescription('');
            setSpecialist('');
            setHealthCheckRating(0);
            setDiagnosisCodes('');
            setDischarge(null);
            setSickLeave(null);
            setEmployerName('');
        } catch (e: unknown) {
            if (axios.isAxiosError(e) && e.response) {
                const errors = e.response.data?.error;
                if (Array.isArray(errors)){
                    const messages = errors.map((e: {message:string}) => e.message).join(', ');
                    setError(`Error: ${messages}`);
                } else if (typeof errors === 'string') {
                    setError(errors);
                }
                console.log(e.response.data);   
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    };
  
    return (
    <div>
        <form onSubmit={onSubmit}>
            <div style={{
                display: "flex",
                flexDirection: 'column',
                padding: '1rem',
                border: '1px dotted black',
                borderRadius: '0.25rem',
                margin: '10px 0',
                gap: '0.5rem'
            }}>
                <Typography>New Entry</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField
                    fullWidth
                    select
                    label="Entry Type"
                    value={type}
                    onChange={handleTypeChange}
                >
                    {Object.entries(EntryTypeLabel).map(([key, label]) =>
                        <MenuItem key={key} value={key}>
                            {label}
                        </MenuItem>
                    )}
                </TextField>
                <TextField
                    fullWidth
                    label="Date *"
                    slotProps={{ inputLabel: { shrink: true } }}
                    type="date"
                    value={date}
                    onChange={({target}) => setDate(target.value)}
                />
                <TextField
                    fullWidth
                    label="Description *"
                    placeholder="description"
                    value={description}
                    onChange={({target}) => setDescription(target.value)}
                />
                <TextField
                    fullWidth
                    label="Specialist *"
                    placeholder="doctor in charge"
                    value={specialist}
                    onChange={({target}) => setSpecialist(target.value)}
                />
                {renderForm()}
                <TextField
                    fullWidth
                    label="Diagnosis Codes (comma separated)"
                    value={diagnosisCodes}
                    onChange={({target}) => setDiagnosisCodes(target.value)}
                />
                <div style={{
                    display: "flex",
                    gap: '5px'
                }}>
                    <Button type="submit" variant="contained">ADD</Button>
                    <Button 
                        variant="outlined"
                        onClick={onCancel}
                    >CANCEL</Button>
                </div>
            </div>
        </form>
    </div>
  );
};

export default EntryForm;