import { Dispatch, SetStateAction } from "react";
import { TextField } from "@mui/material";
import { SickLeave } from "../../types";

interface OHProps {
    employerName: string,
    setEmployerName: Dispatch<SetStateAction<string>>,
    sickLeave: SickLeave | null,
    setSickLeave: Dispatch<SetStateAction<SickLeave | null>>,
}

const OccupationalHealthcareForm = ({
    employerName,
    setEmployerName,
    sickLeave,
    setSickLeave
} : OHProps) => {
    const handleSickLeave = (field: keyof SickLeave, value: string) => {
        setSickLeave({
            startDate: sickLeave?.startDate ?? '',
            endDate: sickLeave?.endDate ?? '',
            [field]: value
        });
    };
  return (
    <>
        <TextField
            fullWidth
            label="Employer Name *"
            placeholder="Employer name..."
            value={employerName}
            onChange={({target}) => setEmployerName(target.value)}
        />
        <TextField
            fullWidth
            label="Start Date"
            slotProps={{ inputLabel: { shrink: true } }}
            type="date"
            value={sickLeave?.startDate}
            onChange={({target}) => handleSickLeave('startDate', target.value)}
        />
        <TextField
            fullWidth
            label="End Date"
            slotProps={{ inputLabel: { shrink: true } }}
            type="date"
            value={sickLeave?.endDate}
            onChange={({target}) => handleSickLeave('endDate', target.value)}
        />
        
    </>
  );
};

export default OccupationalHealthcareForm;