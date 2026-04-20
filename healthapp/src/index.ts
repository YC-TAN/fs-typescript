import express from 'express';
import { calculateBmi } from './bmi/bmiCalculator.ts';
import isNotNumber from './bmi/utils.ts';

const app = express()

app.get('/hello', (_req, res) => {
    return res.send("Hello Full Stack!");
})

app.get('/bmi', (req, res) => {
    const { height=0, weight=0 } = req.query;

    if (!height || !weight) {
        return res.status(400).json({ error: "parameters missing" });
    }

    if (isNotNumber(height) || isNotNumber(weight)) {
        return res.status(400).json({error: "malformatted parameters"})
    }

    const heightInCM = Number(height)
    const weightInKG = Number(weight)
    try {
        const bmi = calculateBmi(heightInCM, weightInKG);
        return res.json({
            weight: weightInKG, 
            height: heightInCM, 
            bmi: bmi
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({error: error.message})
        } else {
            return res.status(500).json({error: "Something went wrong..."})
        }
    }
    
})

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})