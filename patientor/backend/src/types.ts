export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    gender: string,
    occupation: string,
    ssn: string
}

export type PatientWithoutSsn = Omit<Patient, 'ssn'>;
export type PatientWithoutId = Omit<Patient, 'id'>;