import { useState } from 'react'
import type { Level } from '../types'
import { questionsByLevel } from '../data/questions'

const LEVELS: { id: Level; label: string; description: string }[] = [
  { id: 'junior', label: 'Junior', description: 'Основы HTML, CSS, JavaScript' },
  { id: 'middle', label: 'Middle', description: 'React, TypeScript, оптимизация' },
  { id: 'senior', label: 'Senior', description: 'Архитектура, паттерны, производительность' },
]

interface Props {
  selectedLevel: Level | null
  onSelect: (level: Level) => void
  onStart: () => void
}

export function LevelSelect({ selectedLevel, onSelect, onStart }: Props) {
  const [hoveredLevel, setHoveredLevel] = useState<Level | null>(null)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16" style={{ backgroundColor: '#FAF8F5' }}>
      <div className="max-w-2xl w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Выберите уровень сложности</h2>
          <p className="text-gray-500">Вопросы адаптированы под ваш опыт разработки</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {LEVELS.map(({ id, label, description }) => {
            const count = questionsByLevel(id).length
            const isSelected = selectedLevel === id

            const isHovered = hoveredLevel === id
            const borderColor = isSelected ? '#E8703A' : isHovered ? '#C4C2C0' : '#E7E5E4'

            return (
              <button
                key={id}
                onClick={() => onSelect(id)}
                onMouseEnter={() => setHoveredLevel(id)}
                onMouseLeave={() => setHoveredLevel(null)}
                className="bg-white rounded-2xl p-6 text-left transition-all"
                style={{
                  border: `2px solid ${borderColor}`,
                  outline: 'none',
                  boxShadow: isHovered && !isSelected ? '0 2px 8px rgba(0,0,0,0.07)' : 'none',
                  transform: isHovered && !isSelected ? 'translateY(-2px)' : 'none',
                }}
              >
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: isSelected ? '#E8703A' : '#111827' }}
                >
                  {label}
                </h3>
                <p className="text-gray-500 text-sm mb-4 leading-snug">{description}</p>
                <span className="text-sm font-medium" style={{ color: '#E8703A' }}>
                  {count} вопросов
                </span>
              </button>
            )
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={onStart}
            disabled={!selectedLevel}
            className="px-10 py-4 rounded-2xl text-white font-semibold text-base transition-all hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#E8703A' }}
          >
            Начать
          </button>
        </div>
      </div>
    </div>
  )
}
