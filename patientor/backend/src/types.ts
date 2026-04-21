export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export const Gender = {
    Male: 'male',
    Female: 'female',
    Other: 'other'
} as const;

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    gender: Gender,
    occupation: string,
    ssn: string
}

export type PatientWithoutSsn = Omit<Patient, 'ssn'>;
export type NewPatientEntry = Omit<Patient, 'id'>;
export type Gender = typeof Gender[keyof typeof Gender];