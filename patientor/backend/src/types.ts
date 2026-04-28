import {z} from 'zod';

export const Gender = {
    Male: 'male',
    Female: 'female',
    Other: 'other'
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

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

const HealthCheckRating = {
    Healthy: 0,
    LowRisk: 1,
    HighRisk: 2,
    CriticalRisk: 3
} as const;

export type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

interface SickLeave {
    startDate: string,
    endDate: string
}

interface Discharge {
    date: string,
    criteria: string,
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: Discharge;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

  // Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

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

const BaseEntrySchema = z.object({
    description: z.string(),
    date: z.iso.date(),
    specialist: z.string(),
    diagnosisCodes: z.string().array().optional(),
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
    type: z.literal('HealthCheck'),
    healthCheckRating: z.union([
        z.literal(HealthCheckRating.Healthy),
        z.literal(HealthCheckRating.LowRisk),
        z.literal(HealthCheckRating.HighRisk),
        z.literal(HealthCheckRating.CriticalRisk),
    ])
});

const DischargeSchema = z.object({
    date: z.iso.date(),
    criteria: z.string(),
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
    type: z.literal('Hospital'),
    discharge: DischargeSchema,
});

const SickLeaveSchema = z.object({
    startDate: z.iso.date(),
    endDate: z.iso.date(),
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
    type: z.literal('OccupationalHealthcare'),
    employerName: z.string(),
    sickLeave: SickLeaveSchema.optional(),
});

export const NewEntrySchema = z.discriminatedUnion("type", [
    HospitalEntrySchema,
    HealthCheckEntrySchema,
    OccupationalHealthcareEntrySchema,
]);