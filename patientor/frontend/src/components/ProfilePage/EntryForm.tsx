import { useState, type SyntheticEvent, type ChangeEvent } from "react";
import axios from "axios";
import { 
    Typography, 
    TextField, 
    Button,
    Alert 
} from "@mui/material";
import { EntryWithoutId } from "../../types";

interface EntryFormProps {
    addEntry: (values: EntryWithoutId) => Promise<void>,
    onCancel: () => void,
}

const EntryForm = ({addEntry, onCancel}: EntryFormProps) => {
    const [date, setDate] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');
    const [healthCheckRating, setHealthCheckRating] = useState< 0 | 1 | 2 | 3 >(0);
    const [diagnosisCodes, setDiagnosisCodes] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        try {
            setError(null);
            await addEntry({
                type: 'HealthCheck',
                ...(diagnosisCodes && { diagnosisCodes: diagnosisCodes.split(', ') }),
                date,
                description,
                specialist,
                healthCheckRating,        
            });
            setDate('');
            setDescription('');
            setSpecialist('');
            setHealthCheckRating(0);
            setDiagnosisCodes('');
        } catch (e: unknown) {
            if (axios.isAxiosError(e) && e.response) {
                const errors = e.response.data?.error;
                if (Array.isArray(errors)){
                const messages = errors.map((e: {message:string}) => e.message).join(', ');
                setError(`Error: ${messages}`);
                }
                console.log(e.response.data);   
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
        
    };

    const handleRating = ({ target }: ChangeEvent<HTMLInputElement>) => {
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