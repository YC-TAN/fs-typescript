import express from 'express';
import { calculateBmi } from './bmi/bmiCalculator.ts';
import { calculateExercises } from './bmi/exerciseCalculator.ts';
import isNotNumber from './bmi/utils.ts';

const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
    return res.send("Hello Full Stack!");
});

app.get('/bmi', (req, res) => {
    
    const {height, weight} = req.query;

    if (!height || !weight) {
        return res.status(400).json({ error: "malformatted parameters" });
    }

    if (typeof height !== 'string' || isNotNumber(height) || typeof weight !== 'string' || isNotNumber(weight)) {
        return res.status(400).json({error: "malformatted parameters"});
    }

    const heightInCM = Number(height);
    const weightInKG = Number(weight);
    try {
        const bmi = calculateBmi(heightInCM, weightInKG);
        return res.json({
            weight: weightInKG, 
            height: heightInCM, 
            bmi: bmi
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({error: error.message});
        } else {
            return res.status(500).json({error: "Something went wrong..."});
        }
    }
    
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const daily_exercises = req.body.daily_exercises;
    const target = req.body.target;

    if (!daily_exercises || !target) {
        return res.status(400).json({ error: "parameters missing" });
    }

    if (!Array.isArray(daily_exercises) || daily_exercises.length === 0 || daily_exercises.some((a) => isNotNumber(a)) || isNotNumber(target)) {
        return res.status(400).json({error: "malformatted parameters"});
    }

    const daily_exercises_num = daily_exercises.map(a => Number(a));
    const target_num = Number(target);

    try {
        const result = calculateExercises(daily_exercises_num, target_num);
        return res.json(result);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({error: error.message});
        } else {
            return res.status(500).json({error: "Something went wrong..."});
        }
    }

});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});