import { Patient, Diagnosis } from "../../types";
import EntryLine from './EntryLine';
import { Typography } from "@mui/material";
import {FemaleOutlined, MaleOutlined, QuestionMarkOutlined } from '@mui/icons-material';

interface ProfileProps {
    patient: Patient | undefined | null,
    diagnoses: Diagnosis[],
}

const ProfilePage = ({ patient, diagnoses } : ProfileProps) => {
    
    if (!patient) return null;
    if (patient === null) return (<Typography>Patient not found</Typography>);

    const gender = () => {
        return patient.gender === 'other' ? (<QuestionMarkOutlined/>) 
            : patient.gender === 'male' ? (<MaleOutlined />)
            : (<FemaleOutlined />);
    };
    
    return (
        <div>
            <Typography 
                variant="h4"
                sx={{
                    marginBottom: '15px'
                 }}
            >{patient.name} {gender()}</Typography>
            <div>
            <Typography variant="body2">ssn: {patient.ssn ? patient.ssn : "N/A"}</Typography>
            <Typography variant="body2">occupation: {patient.occupation}</Typography>
            <Typography variant="body2">{patient.dateOfBirth && (`date of birth: ${patient.dateOfBirth}`) }</Typography>
            </div>
            <div>
                <Typography variant="h6" sx={{ margin: '15px auto '}}>Entries</Typography>
                {patient.entries?.map(e => (
                        <EntryLine key={e.id} diagnoses={diagnoses} entry={e}/>
                    ))
                }
            </div>
            
        </div>
    );
};
export default ProfilePage;