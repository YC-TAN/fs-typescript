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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type Gender = typeof Gender[keyof typeof Gender];
export type NewPatientEntry = z.infer<typeof NewPatientSchema>;
// export interface Patient extends NewPatientEntry {
//     id: string
// };
// export type PatientWithoutSsn = Omit<Patient, 'ssn'>;