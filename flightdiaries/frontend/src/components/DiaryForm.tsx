import { useState } from "react"
import { Visibility, Weather, type DiaryFormValues } from "../types"

interface DiaryFormProps {
    addDiary: (newDiary: DiaryFormValues) => void
}

const DiaryForm = ({addDiary}: DiaryFormProps) => {
    const [date, setDate] = useState('')
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Great)
    const [weather, setWeather] = useState<Weather>(Weather.Sunny)
    const [comment, setComment] = useState('')

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
        setWeather(Weather.Sunny)
        setVisibility(Visibility.Great)
        setComment('')
    }

  return (
    <div>
        <h1>New Diary</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    date:
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                </label>
            </div>
            <div>                
                weather:
                {Object.values(Weather).map(v => (
                    <label key={v} >
                        <input type="radio" name="weather" value={v} onChange={() => setWeather(v)} checked={v===weather}/>
                        {v}
                    </label>
                ))}
            </div>
            <div>
                visibility:
                {Object.values(Visibility).map(v => (
                    <label key={v} >
                        <input type="radio" name="visibility" value={v} onChange={() => setVisibility(v)} checked={v===visibility}/>
                        {v}
                    </label>
                ))}
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