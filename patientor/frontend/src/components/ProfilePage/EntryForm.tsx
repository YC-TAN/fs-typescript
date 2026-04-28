import { Typography, TextField, Button, Alert } from "@mui/material";
import { EntryWithoutId } from "../../types"
import React, { useState } from "react"

interface EntryFormProps {
    addEntry: (values: EntryWithoutId) => Promise<void>,
    error: string | null,
}

const EntryForm = ({addEntry, error}: EntryFormProps) => {
    const [date, setDate] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');
    const [healthCheckRating, setHealthCheckRating] = useState< 0 | 1 | 2 | 3 >(0);
    const [diagnosisCodes, setDiagnosisCodes] = useState<string>('');

    const onSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const codes = diagnosisCodes.split(', ');
        addEntry({
            type: 'HealthCheck',
            ...(diagnosisCodes && { codes }),
            date,
            description,
            specialist,
            healthCheckRating,        
        });
    };

    const handleRating = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(target.value);
        if (value === 0 || value === 1 || value === 2 || value === 3) {
            setHealthCheckRating(value);
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
                <Typography>New HealthCheck Entry</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField
                    fullWidth
                    label="Date *"
                    placeholder="YYYY-MM-DD"
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
                <TextField
                    fullWidth
                    label="Health Check Rating (0-3) *"
                    value={healthCheckRating}
                    onChange={handleRating}
                />
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
                    <Button type="reset" variant="outlined">CANCEL</Button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default EntryForm