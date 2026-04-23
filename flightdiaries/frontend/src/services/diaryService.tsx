import axios from 'axios';
import type { DiaryEntry, DiaryFormValues } from '../types';

const base = '/api/diaries'

const getAll = async () => {
    const response = await axios.get<DiaryEntry[]>(base)
    return response.data
}

const create = async (object: DiaryFormValues) => {
    const {data} = await axios.post<DiaryEntry>(base, object)
    return data
}

export default {
    getAll,
    create
}