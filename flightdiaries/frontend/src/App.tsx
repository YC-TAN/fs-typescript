import { useEffect, useState } from 'react'

import type { DiaryEntry, NewDiaryEntry } from './types'
import diaryService from './services/diaryService'
import DiaryList from './components/DiaryList'
import DiaryForm from './components/DiaryForm'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    const initialDiaries = async () => {
      const data = await diaryService.getAll()
      setDiaries(data)    
    }
    void initialDiaries()
  }, [])

  const addDiary = async (newDiary: NewDiaryEntry) => {
    const addedDiary = await diaryService.create(newDiary)
    setDiaries(prev => [...prev, addedDiary])
  }

  return (
    <>
    <DiaryForm addDiary={addDiary} />
      <DiaryList diaries={diaries} />
    </>
  )
}

export default App
