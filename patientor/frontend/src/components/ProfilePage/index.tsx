import { Patient, Diagnosis, Entry } from "../../types";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from '../../services/patients'
import EntryLine from './EntryLine';
import { Typography, Button } from "@mui/material";
import {FemaleOutlined, MaleOutlined, QuestionMarkOutlined } from '@mui/icons-material';

interface ProfileProps {
    diagnoses: Diagnosis[],
}

const ProfilePage = ({ diagnoses } : ProfileProps) => {

    const { id } = useParams<{id: string}>();
    const [patient, setPatient] = useState<Patient | null>(null);

    useEffect(() => {
        const fetchPatient = async (patientId: string) => {
            const patientInDB = await patientService.getById(patientId);
            setPatient(patientInDB);
        };

        if (id) {
            void fetchPatient(id);
        }
    }, [id]);
    
    if (!patient) return null;
    if (patient === null) return (<Typography>Patient not found</Typography>);

    const gender = () => {
        return patient.gender === 'other' ? (<QuestionMarkOutlined fontSize="inherit"/>) 
            : patient.gender === 'male' ? (<MaleOutlined fontSize="inherit"/>)
            : (<FemaleOutlined fontSize="inherit"/>);
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
            </div>
            <div>
                <Typography variant="h6" sx={{ margin: '15px auto '}}>Entries</Typography>
                {patient.entries?.map((e: Entry) => (
                        <EntryLine key={e.id} diagnoses={diagnoses} entry={e}/>
                    ))
                }
            </div>
            <div>
                <Button type='submit' variant="contained" color='primary'>ADD NEW ENTRY</Button>
            </div>

        </div>
    );
};
export default ProfilePage;