import axios from 'axios';
import type { DiaryEntry, NewDiaryEntry } from '../types';

const base = '/api/diaries'

const getAll = async () => {
    const response = await axios.get<DiaryEntry[]>(base)
    return response.data
}

const create = async (object: NewDiaryEntry) => {
    const {data} = await axios.post<DiaryEntry>(base, object)
    return data
}

export default {
    getAll,
    create
}