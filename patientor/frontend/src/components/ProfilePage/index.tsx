import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
    Typography, 
    Button, 
    Alert 
} from "@mui/material";
import {
    FemaleOutlined, 
    MaleOutlined, 
    QuestionMarkOutlined 
} from '@mui/icons-material';

import patientService from '../../services/patients';
import { Patient, Diagnosis, Entry, EntryWithoutId } from "../../types";
import EntryForm from "./EntryForm";
import EntryLine from './EntryLine';

interface ProfileProps {
    diagnoses: Diagnosis[],
}

const ProfilePage = ({ diagnoses } : ProfileProps) => {

    const { id } = useParams<{id: string}>();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [notify, setNotify] = useState<string | null>(null);

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

    const gender = () => {
        return patient.gender === 'other' ? (<QuestionMarkOutlined fontSize="inherit"/>) 
            : patient.gender === 'male' ? (<MaleOutlined fontSize="inherit"/>)
            : (<FemaleOutlined fontSize="inherit"/>);
    };
    
    const addEntry = async (obj: EntryWithoutId) => {
        if (!id) return;
        const addedEntry = await patientService.createEntry(id, obj);
        setPatient({
            ...patient,
            entries: [
                ...patient.entries, 
                addedEntry
            ]
        });
        setNotify('New entry added');
        setTimeout(() => {
            setNotify(null);
        }, 5000);
    };

    return (
        <div>
            {notify && (
                <Alert severity="success">{notify}</Alert>
            )}
            <Typography 
                variant="h4"
                sx={{
                    marginBottom: '15px'
                 }}
            >{patient.name} {gender()}</Typography>
            <div>
            <Typography variant="body2">ssn: {patient.ssn ? patient.ssn : "N/A"}</Typography>
            <Typography variant="body2">occupation: {patient.occupation}</Typography>
            {patient.dateOfBirth && 
                <Typography variant="body2">date of birth: {patient.dateOfBirth}</Typography>
            }
            </div>
            {showForm 
                ? <EntryForm 
                    addEntry={addEntry} 
                    onCancel={() => setShowForm(false)}
                    diagnoses={diagnoses}
                    />
                : <Button 
                    variant="contained" 
                    color='primary'
                    onClick={() => setShowForm(true)}
                >ADD NEW ENTRY</Button>
            }
            <div>
                <Typography variant="h6" sx={{ margin: '15px auto '}}>Entries</Typography>
                {patient.entries?.map((e: Entry) => (
                        <EntryLine key={e.id} diagnoses={diagnoses} entry={e}/>
                    ))
                }
            </div>
            <div>
                
            </div>

        </div>
    );
};
export default ProfilePage;