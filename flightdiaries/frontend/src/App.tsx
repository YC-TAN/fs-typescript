import { useEffect, useState } from 'react'
import axios from 'axios'

import {NewDiarySchema, type DiaryEntry, type NewDiaryEntry } from './types'
import diaryService from './services/diaryService'
import DiaryList from './components/DiaryList'
import DiaryForm from './components/DiaryForm'
import {z} from 'zod'

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

  const addDiary = async (newDiary: NewDiaryEntry) => {
    try {
      NewDiarySchema.parse(newDiary);
      const addedDiary = await diaryService.create(newDiary)
      setDiaries(prev => [...prev, addedDiary])
      setMessage(`Success: New Diary added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const errors = error.response.data?.error
        if (Array.isArray(errors)){
          const messages = errors.map((e: {message:string}) => e.message).join(', ')
          setMessage(`Error: ${messages}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }
        console.log(error.response.data)
      } else if (error instanceof z.ZodError) {
        const messages = error.issues.map(e => e.message).join(', ')
          setMessage(`Error: ${messages}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
      } else {
        console.error("Unknown error", error);
        setMessage(`Error: something went wrong...`)
        setTimeout(() => {
            setMessage(null)
          }, 5000)
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
