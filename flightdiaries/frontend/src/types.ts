import {z} from 'zod'

export const Weather = {
    Sunny: 'sunny',
    Rainy: 'rainy',
    Cloudy: 'cloudy',
    Stormy: 'stormy',
    Windy: 'windy',
} as const

export type Weather = typeof Weather[keyof typeof Weather]

export const Visibility = {
    Great: 'great',
    Good: 'good',
    Ok: 'ok',
    Poor: 'poor',
} as const;

export type Visibility = typeof Visibility[keyof typeof Visibility]

export const NewDiarySchema = z.object({
    date: z.iso.date(),
    weather: z.enum(Weather),
    visibility: z.enum(Visibility),
    comment: z.string().optional()
})

export type NewDiaryEntry = z.infer<typeof NewDiarySchema>

export interface DiaryEntry extends NewDiaryEntry {
    id: string
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>