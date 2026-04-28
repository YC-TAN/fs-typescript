import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { TextField, MenuItem } from "@mui/material";
import { HealthCheckRating } from "../../types";

interface HealthCheckFormProps {
    healthCheckRating: HealthCheckRating,
    setHealthCheckRating: Dispatch<SetStateAction<HealthCheckRating>>
}

const HealthCheckRatingOptions: Record<number, string> = {
    0: 'Healthy',
    1: 'Low Risk',
    2: 'High Risk',
    3: 'Critical Risk'
}; 

const HealthCheckForm = (
    {healthCheckRating, setHealthCheckRating} : HealthCheckFormProps
) => {
    const handleRating = ({ target }: ChangeEvent<HTMLInputElement>) => {
            const value = Number(target.value);
            if (value === 0 || value === 1 || value === 2 || value === 3) {
                setHealthCheckRating(value);
            }
        };
  
    return (
    <>
        <TextField
            fullWidth
            select
            label="Health Check Rating (0-3) *"
            value={healthCheckRating}
            onChange={handleRating}
        >
            {Object.entries(HealthCheckRatingOptions).map(([key, label]) =>
                <MenuItem key={key} value={key}>
                    {key} - {label}
                </MenuItem>
            )}
        </TextField>
    </>
  )
}

export default HealthCheckForm