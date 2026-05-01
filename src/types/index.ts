export type Level = 'junior' | 'middle' | 'senior'
export type QuestionType = 'mcq' | 'open' | 'code'

export interface Profile {
  name: string
  goal: string
  avatar: string
}

export interface Question {
  id: number
  level: Level
  type: QuestionType
  question: string
  answer: string
  hint?: string
  codeTemplate?: string
  options?: string[]
  correctIndex?: number
}

export interface LevelProgress {
  completed: number[]
}

export type Progress = Record<Level, LevelProgress>
