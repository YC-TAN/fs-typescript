import type {PatientWithoutSsn} from '../types.ts';
import patients from '../data/patients.ts';


const getAllPatientsWithoutSsn = (): PatientWithoutSsn[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getAllPatientsWithoutSsn
};