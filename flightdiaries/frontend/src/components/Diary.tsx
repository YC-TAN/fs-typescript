import type { DiaryEntry } from "../types"

interface DiaryProps {
    diary: DiaryEntry,
}

const Diary = ({diary}: DiaryProps) => {
  return (
    <div>
        <h4>{diary.date}</h4>
        <p>
            visibility: {diary.visibility}<br/>
            weather: {diary.weather}
        </p>
        <p>comment: {diary.comment}</p>
    </div>
  )
}

export default Diary