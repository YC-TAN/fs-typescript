import express, { type Response} from 'express';
import patientService from '../services/patientService.ts';
import type { PatientWithoutSsn, Patient, PatientWithoutId } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<PatientWithoutSsn[]>) => {
    return res.json(patientService.getAllPatientsWithoutSsn());
});

router.post('/', (req, res: Response<Patient>) => {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
const {name, dateOfBirth, gender, occupation, ssn} = req.body;
    const newPatient: PatientWithoutId = {
name, dateOfBirth, gender, occupation, ssn
    };

    return res.json(patientService.create(newPatient));
});

export default router;