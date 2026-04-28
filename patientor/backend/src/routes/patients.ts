import express, {type Request, type Response} from 'express';
import patientService from '../services/patientService.ts';
import type { Patient, NewPatientEntry, EntryWithoutId, Entry } from '../types.ts';
import { newPatientParser, newEntryParser } from '../middleware.ts';

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

router.post('/:id/entries', newEntryParser, (req: Request<{id: string}, unknown, EntryWithoutId>, res: Response<Entry | {error: string}>) => {
    try {
        const addedEntry = patientService.createEntry(req.params.id, req.body);
        return res.json(addedEntry);
    } catch (e) {
        if (e instanceof Error) {
            return res.status(404).json({ error: e.message });
        }
        return res.status(500).json({ error: 'Unknown error' });
    }
});

export default router;