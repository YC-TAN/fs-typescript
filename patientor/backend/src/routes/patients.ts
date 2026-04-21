import express, {type Request, type Response} from 'express';
import patientService from '../services/patientService.ts';
import type { PatientWithoutSsn, Patient, NewPatientEntry } from '../types.ts';
import { newPatientParser } from '../middleware.ts';

const router = express.Router();

router.get('/', (_req, res: Response<PatientWithoutSsn[]>) => {
    return res.json(patientService.getAllPatientsWithoutSsn());
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedPatient = patientService.create(req.body);
    return res.json(addedPatient);
});

export default router;