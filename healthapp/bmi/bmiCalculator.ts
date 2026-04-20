const calculateBmi = (heightInCM: number, weightInKG: number): string => {
    const heightInMeter = heightInCM / 100
    const bmi = weightInKG / (heightInMeter * heightInMeter)

    if (bmi < 18.5) return "Underweight"
    if (bmi < 24.9) return "Normal range"
    if (bmi < 29.9) return "Overweight"
    return "Obese"
}

console.log(calculateBmi(180, 74))