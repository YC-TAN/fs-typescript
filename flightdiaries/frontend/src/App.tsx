import { useEffect, useState } from 'react'
import axios from 'axios'

import type { DiaryEntry, DiaryFormValues } from './types'
import diaryService from './services/diaryService'
import DiaryList from './components/DiaryList'
import DiaryForm from './components/DiaryForm'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    const initialDiaries = async () => {
      const data = await diaryService.getAll()
      setDiaries(data)    
    }
    void initialDiaries()
  }, [])

  const addDiary = async (newDiary: DiaryFormValues) => {
    try {
      const addedDiary = await diaryService.create(newDiary)
      setDiaries(prev => [...prev, addedDiary])
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const errors = error.response.data?.error
        if (Array.isArray(errors)){
          const messages = errors.map((e: {message:string}) => e.message).join(', ')
          setMessage(`Error: ${messages}`)
        }
        console.log(error.response.data)
    } else {
      console.error("Unknown error", error);
        setMessage(`Error: something went wrong...`)
      }
    }
  }

  return (
    <>
      {message && <div>{message}</div>}
      <DiaryForm addDiary={addDiary} />
      <DiaryList diaries={diaries} />
    </>
  )
}

export default App
