import { useState } from 'react'
import type { Level, Progress } from '../types'

const STORAGE_KEY = 'fis_progress_v2'

const defaultProgress = (): Progress => ({
  junior: { completed: [] },
  middle: { completed: [] },
  senior: { completed: [] },
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

  function markCompleted(level: Level, questionId: number) {
    setProgress((prev) => {
      const updated = {
        ...prev,
        [level]: {
          completed: prev[level].completed.includes(questionId)
            ? prev[level].completed
            : [...prev[level].completed, questionId],
        },
      }
      saveProgress(updated)
      return updated
    })
  }

  function resetLevel(level: Level) {
    setProgress((prev) => {
      const updated = { ...prev, [level]: { completed: [] } }
      saveProgress(updated)
      return updated
    })
  }

  function resetAll() {
    const fresh = defaultProgress()
    saveProgress(fresh)
    setProgress(fresh)
  }

  return { progress, markCompleted, resetLevel, resetAll }
}
