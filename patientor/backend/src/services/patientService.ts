import type {
    NonSensitivePatient, 
    NewPatientEntry, 
    Patient, 
    EntryWithoutId, 
    Entry
} from '../types.ts';
import patients from '../data/patients.ts';
import { v4 as uuid } from 'uuid';

const getAll = (): Patient[] => {
    return patients;
};

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
    return patients.find(p => p.id === id);
};

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

const createEntry = (patientId: string, newEntry: EntryWithoutId): Entry => {
    const id: string = uuid();
    const patient = getById(patientId);
    if (!patient) throw new Error('Patient not found');
    const entry = {
        ...newEntry,
        id
    };
    patient.entries.push(entry);
    return entry;
};

export default {
    getAll,
    getAllPatientsWithoutSsn,
    create,
    getById,
    createEntry,
};