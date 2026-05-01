import { useState } from 'react'
import type { Level, Question } from '../types'

interface Props {
  level: Level
  questions: Question[]
  completedIds: number[]
  onComplete: (questionId: number) => void
  onFinish: (correct: number, total: number) => void
  onBack: () => void
}

const TYPE_LABELS: Record<string, string> = {
  mcq: 'Выбор варианта',
  open: 'Свободный ответ',
  code: 'Код',
}

export function QuizScreen({ level: _level, questions, completedIds, onComplete, onFinish, onBack }: Props) {
  const startIndex = questions.findIndex((q) => !completedIds.includes(q.id))
  const [index, setIndex] = useState(startIndex === -1 ? 0 : startIndex)
  const [userAnswer, setUserAnswer] = useState('')
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [hoveredOption, setHoveredOption] = useState<number | null>(null)

  const question = questions[index]
  const isFirst = index === 0
  const isLast = index === questions.length - 1

  function handleNext() {
    if (!revealed && question.type !== 'open' && question.type !== 'code') return

    if (question.type === 'mcq' && selectedOption === question.correctIndex) {
      setCorrectCount((c) => c + 1)
    }

    onComplete(question.id)

    if (isLast) {
      const correct = question.type === 'mcq' && selectedOption === question.correctIndex
        ? correctCount + 1
        : correctCount
      onFinish(correct, questions.length)
      return
    }

    setIndex((i) => i + 1)
    setUserAnswer('')
    setSelectedOption(null)
    setRevealed(false)
    setShowHint(false)
  }

  function handlePrev() {
    if (isFirst) return
    setIndex((i) => i - 1)
    setUserAnswer('')
    setSelectedOption(null)
    setRevealed(false)
    setShowHint(false)
  }

  function handleReveal() {
    setRevealed(true)
  }

  function handleSelectOption(i: number) {
    if (revealed) return
    setSelectedOption(i)
    setRevealed(true)
  }

  const canGoNext = question.type === 'mcq' ? revealed : true

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAF8F5' }}>
      <header className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Назад
        </button>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-500">
            {index + 1} / {questions.length}
          </span>
          <div className="w-32 h-1.5 bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${((index + 1) / questions.length) * 100}%`, backgroundColor: '#E8703A' }}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 py-8">
        <div className="max-w-2xl w-full flex-1 flex flex-col gap-6">
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex-1">
            <span className="inline-block bg-stone-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
              {TYPE_LABELS[question.type]}
            </span>

            <p className="text-gray-900 text-xl font-semibold leading-snug mb-6">
              {question.question}
            </p>

            {question.type === 'mcq' && question.options && (
              <div className="flex flex-col gap-3">
                {question.options.map((option, i) => {
                  let borderColor = '#E7E5E4'
                  let bgColor = 'white'
                  let textColor = '#374151'

                  if (revealed) {
                    if (i === question.correctIndex) {
                      borderColor = '#22C55E'
                      bgColor = '#F0FDF4'
                      textColor = '#15803D'
                    } else if (i === selectedOption) {
                      borderColor = '#EF4444'
                      bgColor = '#FEF2F2'
                      textColor = '#B91C1C'
                    }
                  } else if (i === selectedOption) {
                    borderColor = '#E8703A'
                  } else if (hoveredOption === i) {
                    borderColor = '#C4C2C0'
                    bgColor = '#FAFAF9'
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelectOption(i)}
                      onMouseEnter={() => !revealed && setHoveredOption(i)}
                      onMouseLeave={() => setHoveredOption(null)}
                      disabled={revealed}
                      className="flex items-center gap-3 w-full text-left rounded-xl px-4 py-3.5 transition-all"
                      style={{ border: `1.5px solid ${borderColor}`, backgroundColor: bgColor, color: textColor }}
                    >
                      <span
                        className="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                        style={{ borderColor }}
                      >
                        {revealed && i === question.correctIndex && (
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#22C55E' }} />
                        )}
                        {revealed && i === selectedOption && i !== question.correctIndex && (
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#EF4444' }} />
                        )}
                        {!revealed && i === selectedOption && (
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#E8703A' }} />
                        )}
                      </span>
                      <span className="text-sm">{option}</span>
                    </button>
                  )
                })}

                {revealed && (
                  <div className="mt-2 p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <p className="text-sm text-gray-600 leading-relaxed">{question.answer}</p>
                  </div>
                )}
              </div>
            )}

            {question.type === 'open' && (
              <div className="flex flex-col gap-3">
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Введите ваш ответ..."
                  rows={6}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none outline-none focus:border-stone-400 transition-colors"
                />
                {revealed && (
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <p className="text-xs font-medium text-gray-500 mb-1.5">Эталонный ответ</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{question.answer}</p>
                  </div>
                )}
                {!revealed && (
                  <button
                    onClick={handleReveal}
                    className="text-sm text-gray-500 hover:text-gray-700 underline underline-offset-2 text-left transition-colors w-fit"
                  >
                    Показать эталонный ответ
                  </button>
                )}
              </div>
            )}

            {question.type === 'code' && (
              <div className="flex flex-col gap-3">
                <div className="rounded-xl overflow-hidden border border-stone-700">
                  <div className="bg-stone-800 px-4 py-2 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
                    <span className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
                  </div>
                  <textarea
                    value={userAnswer || question.codeTemplate || ''}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    rows={10}
                    spellCheck={false}
                    className="w-full bg-stone-900 text-stone-100 font-mono text-sm px-4 py-3 resize-none outline-none"
                    style={{ tabSize: 2 }}
                  />
                </div>
                {revealed && (
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <p className="text-xs font-medium text-gray-500 mb-2">Решение</p>
                    <pre className="text-sm text-gray-700 font-mono whitespace-pre-wrap leading-relaxed">{question.answer}</pre>
                  </div>
                )}
                {!revealed && (
                  <button
                    onClick={handleReveal}
                    className="text-sm text-gray-500 hover:text-gray-700 underline underline-offset-2 text-left transition-colors w-fit"
                  >
                    Показать решение
                  </button>
                )}
              </div>
            )}

            {showHint && question.hint && (
              <div className="mt-4 flex items-start gap-2 p-3 rounded-xl" style={{ backgroundColor: '#FEF0E9' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8703A" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-sm leading-relaxed" style={{ color: '#92400E' }}>{question.hint}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-stone-200">
        <div className="max-w-2xl mx-auto px-6">
          <div className="flex items-center gap-3 py-3 border-b border-stone-100">
            <ActionButton icon={<MicIcon />} label="Голосовой ввод" disabled />
            <ActionButton
              icon={<HintIcon />}
              label="Подсказка"
              disabled={!question.hint}
              onClick={() => setShowHint((v) => !v)}
              active={showHint}
            />
            <ActionButton icon={<AiIcon />} label="AI Оценка" disabled />
          </div>

          <div className="flex items-center justify-between py-4">
            <button
              onClick={handlePrev}
              disabled={isFirst}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-700 border border-stone-200 hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Предыдущий
            </button>
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#E8703A' }}
            >
              {isLast ? 'Завершить' : 'Следующий'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ActionButton({ icon, label, disabled, onClick, active }: {
  icon: React.ReactNode
  label: string
  disabled?: boolean
  onClick?: () => void
  active?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      style={{
        borderColor: active ? '#E8703A' : '#E7E5E4',
        color: active ? '#E8703A' : '#374151',
        backgroundColor: active ? '#FEF0E9' : 'white',
      }}
    >
      {icon}
      {label}
    </button>
  )
}

function MicIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  )
}

function HintIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

function AiIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
