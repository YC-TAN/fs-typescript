import { Dispatch, SetStateAction } from "react";
import { TextField } from "@mui/material";
import { Discharge } from "../../types";

interface HospitalProps {
    discharge: Discharge | null,
    setDischarge: Dispatch<SetStateAction<Discharge | null>>,
}

const HospitalForm = ({ discharge, setDischarge }: HospitalProps) => {
    const handleDischarge = (field: keyof Discharge, value: string) => {
            setDischarge({
                date: discharge?.date ?? '',
                criteria: discharge?.criteria ?? '',
                [field]: value
            });
        };
  return (
    <>
        <TextField
            fullWidth
            label="Employer Name *"
            placeholder="Employer name..."
            value={discharge?.criteria}
            onChange={({target}) => handleDischarge('criteria', target.value)}
        />
        <TextField
            fullWidth
            label="Date discharged *"
            slotProps={{ inputLabel: { shrink: true } }}
            type="date"
            value={discharge?.date}
            onChange={({target}) => handleDischarge('date', target.value)}
        />
    </>
  );
};

export default HospitalForm;