import express from 'express';
import diagnosisRouter from './routes/diagnoses.ts';
import patientRouter from './routes/patients.ts';

const app = express();

app.use(express.json());

app.get('/api/ping', (_req, res) => {
    console.log("server connected");
    res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});