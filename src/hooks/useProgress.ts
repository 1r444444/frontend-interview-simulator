import { useState } from 'react'
import type { Topic, Progress } from '../types'

const STORAGE_KEY = 'fis_progress'

const defaultProgress = (): Progress => ({
  javascript: { completed: [] },
  typescript: { completed: [] },
  react: { completed: [] },
})

function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : defaultProgress()
  } catch {
    return defaultProgress()
  }
}

function saveProgress(progress: Progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(loadProgress)

  function markCompleted(topic: Topic, questionId: number) {
    setProgress((prev) => {
      const updated = {
        ...prev,
        [topic]: {
          completed: prev[topic].completed.includes(questionId)
            ? prev[topic].completed
            : [...prev[topic].completed, questionId],
        },
      }
      saveProgress(updated)
      return updated
    })
  }

  function resetTopic(topic: Topic) {
    setProgress((prev) => {
      const updated = { ...prev, [topic]: { completed: [] } }
      saveProgress(updated)
      return updated
    })
  }

  function resetAll() {
    const fresh = defaultProgress()
    saveProgress(fresh)
    setProgress(fresh)
  }

  return { progress, markCompleted, resetTopic, resetAll }
}
