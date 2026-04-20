import isNotNumber from "./utils.ts";

interface argValues {
    value1: number,
    value2: number
}

const parseArguments = (args: string[]): argValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
    const [, , value1, value2] = args
    if (isNotNumber(value1) || isNotNumber(value2)) {
        throw new Error('Provided values were not numbers!');
    }
    return {
        value1: Number(value1),
        value2: Number(value2)
    }
}

export const calculateBmi = (heightInCM: number, weightInKG: number): string => {

    if (heightInCM <= 0) throw new Error('Height must be greater than 0')
    if (weightInKG <= 0) throw new Error('Height must be greater than 0')  

    const heightInMeter = heightInCM / 100
    const bmi = weightInKG / (heightInMeter * heightInMeter)

    if (bmi < 18.5) return "Underweight"
    if (bmi < 24.9) return "Normal range"
    if (bmi < 29.9) return "Overweight"
    return "Obese"
}

// console.log(calculateBmi(180, 74))

if (process.argv[1] === import.meta.filename) {
    try {
        const { value1, value2 } = parseArguments(process.argv as string[])
        console.log(calculateBmi(value1, value2))
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    }
}