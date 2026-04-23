import { useState, type ChangeEvent } from "react"
import { Visibility, Weather, type NewDiaryEntry } from "../types"

interface DiaryFormProps {
    addDiary: (newDiary: NewDiaryEntry) => void
}

const DiaryForm = ({addDiary}: DiaryFormProps) => {
    const [date, setDate] = useState('')
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Good)
    const [weather, setWeather] = useState<Weather>(Weather.Sunny)
    const [comment, setComment] = useState('')

    const onVisibilityChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if ( typeof event.target.value === "string") {
            const value = event.target.value;
            const visibility = Object.values(Visibility).find(v => v.toString() === value);
            if (visibility) {
                setVisibility(visibility);
            }
        }
    }

    const onWeatherChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if ( typeof event.target.value === "string") {
            const value = event.target.value;
            const weather = Object.values(Weather).find(v => v.toString() === value);
            if (weather) {
                setWeather(weather);
            }
        }
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const newDiary: NewDiaryEntry = {
            date,
            visibility,
            weather,
            comment
        }
        addDiary(newDiary);
        setDate('')
        setWeather(Weather.Sunny)
        setVisibility(Visibility.Good)
        setComment('')
    }

  return (
    <div>
        <h1>New Diary</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    date:
                    <input type="text" name="date" onChange={(e) => setDate(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    weather:
                    <input type="text" name="weather" onChange={onWeatherChange} />
                </label>
            </div>
            <div>
                <label>
                    visibility:
                    <input type="text" name="visibility" onChange={onVisibilityChange} />
                </label>
            </div>
            <div>
                <label>
                    comment:
                    <input type="text" name="comment" onChange={(e) => setComment(e.target.value)} />
                </label>
            </div>
            <button type='submit'>add</button>
        </form>
    </div>
  )
}

export default DiaryForm