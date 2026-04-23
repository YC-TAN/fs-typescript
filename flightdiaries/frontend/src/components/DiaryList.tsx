import type { DiaryEntry } from "../types";
import Diary from "./Diary";

interface DiaryListProps {
    diaries: DiaryEntry[]
}

const DiaryList = ({diaries}: DiaryListProps) => {
  return (
    <div>
        <h1>Diaries</h1>
        {diaries.map(d => (
            <Diary key={d.id} diary={d} />
        ))}
    </div>
  )
}

export default DiaryList