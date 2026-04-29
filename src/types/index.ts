export type Topic = 'javascript' | 'typescript' | 'react'

export interface Question {
  id: number
  topic: Topic
  question: string
  answer: string
}

export interface TopicProgress {
  completed: number[]
}

export type Progress = Record<Topic, TopicProgress>
