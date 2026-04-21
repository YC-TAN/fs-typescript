import type {PatientWithoutSsn, NewPatientEntry, Patient} from '../types.ts';
import patients from '../data/patients.ts';
import { v4 as uuid } from 'uuid';


const getAllPatientsWithoutSsn = (): PatientWithoutSsn[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const create = (newPatient: NewPatientEntry): Patient => {
    const id: string = uuid();
    const patient = {
        ...newPatient,
        id
    };
    patients.push(patient);
    return patient;
};

export default {
    getAllPatientsWithoutSsn,
    create
};