import type { Level } from '../types'

const LEVEL_LABELS: Record<Level, string> = {
  junior: 'Junior',
  middle: 'Middle',
  senior: 'Senior',
}

interface Props {
  level: Level
  correct: number
  total: number
  onRestart: () => void
  onBack: () => void
}

export function ResultsScreen({ level, correct, total, onRestart, onBack }: Props) {
  const percent = Math.round((correct / total) * 100)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: '#FAF8F5' }}>
      <div className="max-w-sm w-full text-center">
        <div className="text-6xl mb-5">
          {percent >= 80 ? '🏆' : percent >= 50 ? '👍' : '💪'}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Уровень {LEVEL_LABELS[level]} пройден!
        </h2>

        <p className="text-gray-500 mb-8 text-sm">
          {total} вопросов · правильно: {correct} · ошибок: {total - correct}
        </p>

        <div className="bg-white border border-stone-200 rounded-2xl p-5 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500">Результат</span>
            <span className="text-sm font-semibold text-gray-900">{correct} / {total}</span>
          </div>
          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${percent}%`,
                backgroundColor: percent >= 80 ? '#22C55E' : percent >= 50 ? '#E8703A' : '#EF4444',
              }}
            />
          </div>
          <p className="text-right text-xs text-gray-400 mt-1.5">{percent}%</p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onRestart}
            className="w-full py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: '#E8703A' }}
          >
            Пройти снова
          </button>
          <button
            onClick={onBack}
            className="w-full py-3 rounded-xl border border-stone-200 bg-white text-gray-700 font-medium hover:bg-stone-50 transition-colors"
          >
            На главную
          </button>
        </div>
      </div>
    </div>
  )
}
