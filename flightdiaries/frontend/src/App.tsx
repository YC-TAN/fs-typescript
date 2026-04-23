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
      if (axios.isAxiosError(error)) {
        if (error?.response?.data?.error[0]?.message && typeof error?.response?.data?.error[0]?.message === 'string') {
          console.log(error.response.data.error[0].message)
          setMessage(`Error: ${error.response.data.error[0].message}`)
        }      
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
