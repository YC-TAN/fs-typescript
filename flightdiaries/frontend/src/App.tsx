import { useEffect, useState } from 'react'

import type { DiaryEntry } from './types'
import flightService from './services/flightService'
import DiaryList from './components/DiaryList'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    const initialDiaries = async () => {
      const data = await flightService.getAll()
      setDiaries(data)    
    }
    void initialDiaries()
  }, [])

  return (
    <>
      <DiaryList diaries={diaries} />
    </>
  )
}

export default App
