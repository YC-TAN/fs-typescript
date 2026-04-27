import { Patient } from "../../types";
import { Typography } from "@mui/material";
import {FemaleOutlined, MaleOutlined, QuestionMarkOutlined } from '@mui/icons-material';

interface ProfileProps {
    patient: Patient,
}

const ProfilePage = ({ patient } : ProfileProps) => {
    const gender = () => {
        return patient.gender === 'other' ? (<QuestionMarkOutlined/>) 
            : patient.gender === 'male' ? (<MaleOutlined />)
            : (<FemaleOutlined />);
    };

    if (!patient) return null;
    return (
        <div>
            <Typography 
                variant="h5"
                sx={{ display: 'inline' }}
            >{patient.name} {gender()}</Typography>
            <div>ssn: {patient.ssn ? patient.ssn : "N/A"}</div>
            <div>occupation: {patient.occupation}</div>
            <div>date of birth: {patient.dateOfBirth ? patient.dateOfBirth : "N/A"}</div>
        </div>
    );
};
export default ProfilePage;