interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: 1 | 2 | 3,
    ratingDescription: string,
    target: number,
    average: number
}

const description: Record<number, string> = {
  1: "Not enough",
  2: "Good",
  3: "Perfect"
};

const calculateExercises = (exerciseHrs: number[], target: number): Result => {
    const periodLength = exerciseHrs.length
    const trainingDays = exerciseHrs.filter(d => d > 0).length
    if (periodLength <=0 ) throw new Error('no training record found')
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))