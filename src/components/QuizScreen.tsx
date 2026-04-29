import { useState, useEffect } from 'react'
import type { Topic, Question } from '../types'
import { ProgressBar } from './ProgressBar'
import { Timer } from './Timer'

const TIMER_SECONDS = 30

interface Props {
  topic: Topic
  questions: Question[]
  completedIds: number[]
  onComplete: (questionId: number) => void
  onFinish: () => void
  onBack: () => void
}

export function QuizScreen({ topic, questions, completedIds, onComplete, onFinish, onBack }: Props) {
  const startIndex = questions.findIndex((q) => !completedIds.includes(q.id))
  const [index, setIndex] = useState(startIndex === -1 ? 0 : startIndex)
  const [revealed, setRevealed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)
  const [timerRunning, setTimerRunning] = useState(true)

  const question = questions[index]
  const isLast = index === questions.length - 1

  useEffect(() => {
    setRevealed(false)
    setTimeLeft(TIMER_SECONDS)
    setTimerRunning(true)
  }, [index])

  useEffect(() => {
    if (!timerRunning || timeLeft <= 0) return
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearTimeout(id)
  }, [timerRunning, timeLeft])

  useEffect(() => {
    if (timeLeft === 0 && timerRunning) {
      setTimerRunning(false)
      setRevealed(true)
    }
  }, [timeLeft, timerRunning])

  function handleReveal() {
    setRevealed(true)
    setTimerRunning(false)
    onComplete(question.id)
  }

  function handleNext() {
    onComplete(question.id)
    if (isLast) {
      onFinish()
    } else {
      setIndex((i) => i + 1)
    }
  }

  const topicLabel = { javascript: 'JavaScript', typescript: 'TypeScript', react: 'React' }[topic]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors"
          >
            ← Back
          </button>
          <span className="text-sm font-medium text-gray-500">{topicLabel}</span>
          <Timer timeLeft={timeLeft} total={TIMER_SECONDS} />
        </div>

        <ProgressBar current={index + 1} total={questions.length} />

        <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <p className="text-gray-900 text-lg font-medium leading-relaxed">
            {question.question}
          </p>

          {!revealed ? (
            <button
              onClick={handleReveal}
              className="mt-6 w-full py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors"
            >
              Reveal Answer
            </button>
          ) : (
            <div className="mt-5">
              <div className="h-px bg-gray-100 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed">
                {question.answer}
              </p>
              <button
                onClick={handleNext}
                className="mt-5 w-full py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
              >
                {isLast ? 'Finish' : 'Next Question →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
