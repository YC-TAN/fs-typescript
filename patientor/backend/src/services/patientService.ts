import type {NonSensitivePatient, NewPatientEntry, Patient} from '../types.ts';
import patients from '../data/patients.ts';
import { v4 as uuid } from 'uuid';


const getAllPatientsWithoutSsn = (): NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation, }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getById = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id)
}

const create = (newPatient: NewPatientEntry): Patient => {
    const id: string = uuid();
    const patient = {
        ...newPatient,
        id,
        entries: []
    };
    patients.push(patient);
    return patient;
};

export default {
    getAllPatientsWithoutSsn,
    create,
    getById,
};