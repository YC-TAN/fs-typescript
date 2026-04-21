import express, { type Response } from 'express';
import patientService from '../services/patientService.ts';
import type { PatientWithoutSsn } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<PatientWithoutSsn[]>) => {
    return res.json(patientService.getAllPatientsWithoutSsn());
});

export default router;