import { Dispatch, SetStateAction } from "react";
import { 
    MenuItem,
    InputLabel,
    FormControl,
    Select,
    SelectChangeEvent
} from "@mui/material";
import { HealthCheckRating } from "../../types";

interface HealthCheckFormProps {
    healthCheckRating: HealthCheckRating,
    setHealthCheckRating: Dispatch<SetStateAction<HealthCheckRating>>
}

const RatingOptions: Record<HealthCheckRating, string> = {
    0: 'Healthy',
    1: 'Low Risk',
    2: 'High Risk',
    3: 'Critical Risk'
}; 

const HealthCheckForm = (
    {healthCheckRating, setHealthCheckRating} : HealthCheckFormProps
) => {
    const handleRating = ({ target }: SelectChangeEvent<HealthCheckRating>) => {
            const value = Number(target.value);
            if (value === 0 || value === 1 || value === 2 || value === 3) {
                setHealthCheckRating(value);
            }
        };
  
    return (
    <>
        <FormControl fullWidth>
            <InputLabel id="rating">Age</InputLabel>
            <Select
                labelId="rating"
                value={healthCheckRating}
                label="Health Check Rating (0-3) *"
                onChange={handleRating}
            >
                {Object.entries(RatingOptions).map(([key, label]) =>
                    <MenuItem key={key} value={key}>
                        {key} - {label}
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    </>
  );
};

export default HealthCheckForm;