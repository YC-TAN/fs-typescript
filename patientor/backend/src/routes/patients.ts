import express, {type Request, type Response} from 'express';
import patientService from '../services/patientService.ts';
import type { Patient, NewPatientEntry } from '../types.ts';
import { newPatientParser } from '../middleware.ts';

const router = express.Router();

// router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
//     return res.json(patientService.getAllPatientsWithoutSsn());
// });

router.get('/', (_req, res: Response<Patient[]>) => {
    return res.json(patientService.getAll());
});

router.get('/:id', (req, res: Response<Patient | {error: string}>) => {
    const patient = patientService.getById(req.params.id);
    
    if (patient) {
        return res.json(patient);
    } else {
        return res.status(404).json({ error: "Patient not found" });
    }
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedPatient = patientService.create(req.body);
    return res.json(addedPatient);
});

export default router;