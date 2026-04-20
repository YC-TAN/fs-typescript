import isNotNumber from "./utils.ts"

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: 1 | 2 | 3,
    ratingDescription: string,
    target: number,
    average: number
}

interface argValues {
    value1: number[],
    value2: number
}

const parseArguments = (args: string[]): argValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
    const [, , ...rest] = args
    const checked = rest.map(Number)
    if (checked.some(a => isNotNumber(a))) {
        throw new Error('Provided values were not numbers!');
    }
    const value1 = checked.splice(0, checked.length - 1)
    const value2 = checked[checked.length - 1]
    return {
        value1,
        value2
    }
}

const description: Record<number, string> = {
  1: "Not enough",
  2: "Good",
  3: "Perfect"
};

const calculateExercises = (exerciseHrs: number[], target: number): Result => {
    const periodLength = exerciseHrs.length
    const trainingDays = exerciseHrs.filter(d => d > 0).length
    if (periodLength <= 0 ) throw new Error('no training record found')
    const average = exerciseHrs.reduce((sum, item) => sum + item, 0)/periodLength

    let rating: 1 | 2 | 3;
    if (average < target) {
        rating = 1
    } else if (average === target) {
        rating = 2
    } else {
        rating = 3
    }

    return {
        periodLength,
        trainingDays,
        success: average >= target,
        rating,
        ratingDescription: description[rating],
        target,
        average
    }
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

if (process.argv[1] === import.meta.filename) {
    try {
        const { value1, value2 } = parseArguments(process.argv as string[])
        console.log(calculateExercises(value1, value2))
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    }
}