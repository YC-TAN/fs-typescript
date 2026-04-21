import {z} from 'zod';

export const Gender = {
    Male: 'male',
    Female: 'female',
    Other: 'other'
} as const;

export const NewPatientSchema = z.object({
    name: z.string(),
    ssn: z.string(),
    occupation: z.string(),
    gender: z.enum(Gender),
    dateOfBirth: z.iso.date()
});

export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
};

export type Gender = typeof Gender[keyof typeof Gender];
export type NewPatientEntry = z.infer<typeof NewPatientSchema>;
export interface Patient extends NewPatientEntry {
    id: string
};
export type PatientWithoutSsn = Omit<Patient, 'ssn'>;