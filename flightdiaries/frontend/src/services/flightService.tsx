import axios from 'axios';
import type { DiaryEntry } from '../types';

const base = '/api/diaries'

const getAll = async () => {
    const response = await axios.get<DiaryEntry[]>(base)
    return response.data
}

export default {
    getAll,
}