import { useState } from "react"
import type { DiaryFormValues } from "../types"

// interface DiaryFormValues {
//     date: string,
//     weather: string,
//     visibility: string,
//     comment?: string
// }

interface DiaryFormProps {
    addDiary: (newDiary: DiaryFormValues) => void
}

const DiaryForm = ({addDiary}: DiaryFormProps) => {
    const [date, setDate] = useState('')
    const [visibility, setVisibility] = useState('')
    const [weather, setWeather] = useState('')
    const [comment, setComment] = useState('')

    // const onVisibilityChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     event.preventDefault();
    //     if ( typeof event.target.value === "string") {
    //         const value = event.target.value;
    //         const visibility = Object.values(Visibility).find(v => v.toString() === value);
    //         if (visibility) {
    //             setVisibility(visibility);
    //         }
    //     }
    // }

    // const onWeatherChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     event.preventDefault();
    //     if ( typeof event.target.value === "string") {
    //         const value = event.target.value;
    //         const weather = Object.values(Weather).find(v => v.toString() === value);
    //         if (weather) {
    //             setWeather(weather);
    //         }
    //     }
    // }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const newDiary = {
            date,
            visibility,
            weather,
            comment
        }
        addDiary(newDiary);
        setDate('')
        setWeather('')
        setVisibility('')
        setComment('')
    }

  return (
    <div>
        <h1>New Diary</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    date:
                    <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    weather:
                    <input type="text" value={weather} onChange={({target}) => setWeather(target.value)} />
                </label>
            </div>
            <div>
                <label>
                    visibility:
                    <input type="text" value={visibility} onChange={(e) => setVisibility(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    comment:
                    <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
                </label>
            </div>
            <button type='submit'>add</button>
        </form>
    </div>
  )
}

export default DiaryForm