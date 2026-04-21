import express, { type Response} from 'express';
import patientService from '../services/patientService.ts';
import type { PatientWithoutSsn, Patient } from '../types.ts';
import parseNewPatientEntry from '../utils.ts';

const router = express.Router();

router.get('/', (_req, res: Response<PatientWithoutSsn[]>) => {
    return res.json(patientService.getAllPatientsWithoutSsn());
});

router.post('/', (req, res: Response<Patient | string>) => {
    try {
        const newPatient = parseNewPatientEntry(req.body);
        return res.json(patientService.create(newPatient));
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        }
        return res.status(400).send(errorMessage);
    }
});

export default router;