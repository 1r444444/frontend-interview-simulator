import { useState } from 'react'
import type { Profile, Level, Progress } from '../types'
import { questionsByLevel } from '../data/questions'

const AVATARS = [
  '🧑‍💻', '👩‍💻', '👨‍💻', '🐱', '🐻', '🦊', '🐼', '🐸',
  '🦁', '🐯', '🐧', '🦄', '🚀', '⭐', '🎯', '💡',
  '🔥', '💎', '🌟', '🎓', '🏆', '🧠', '⚡', '🌈',
]

const LEVEL_LABELS: Record<Level, string> = {
  junior: 'Junior',
  middle: 'Middle',
  senior: 'Senior',
}

const LEVEL_COLORS: Record<Level, string> = {
  junior: '#22C55E',
  middle: '#E8703A',
  senior: '#8B5CF6',
}

interface Props {
  profile: Profile
  progress: Progress
  onSave: (p: Profile) => void
  onResetLevel: (level: Level) => void
  onResetAll: () => void
  onBack: () => void
}

export function ProfilePage({ profile, progress, onSave, onResetLevel, onResetAll, onBack }: Props) {
  const [name, setName] = useState(profile.name)
  const [goal, setGoal] = useState(profile.goal)
  const [avatar, setAvatar] = useState(profile.avatar)
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)
  const [saved, setSaved] = useState(false)
  const [confirmReset, setConfirmReset] = useState<Level | 'all' | null>(null)

  function handleSave() {
    onSave({ name, goal, avatar })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleReset(target: Level | 'all') {
    if (target === 'all') {
      onResetAll()
    } else {
      onResetLevel(target)
    }
    setConfirmReset(null)
  }

  const levels: Level[] = ['junior', 'middle', 'senior']

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
        <h1 className="text-base font-semibold text-gray-900">Профиль</h1>
        <div className="w-16" />
      </header>

      <main className="flex-1 flex flex-col items-center px-6 py-8 gap-6">
        <div className="max-w-lg w-full flex flex-col gap-5">

          {/* Avatar + name block */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6">
            <div className="flex items-center gap-5 mb-5">
              <button
                onClick={() => setShowAvatarPicker((v) => !v)}
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all hover:scale-105 active:scale-95 flex-shrink-0"
                style={{ backgroundColor: '#FEF0E9' }}
                title="Сменить аватар"
              >
                {avatar}
              </button>
              <div className="flex-1">
                <p className="text-xs text-gray-400 mb-1">Нажмите на аватар чтобы сменить</p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  maxLength={30}
                  className="w-full text-lg font-semibold text-gray-900 bg-transparent outline-none border-b-2 border-stone-200 focus:border-stone-400 pb-1 transition-colors placeholder-gray-300"
                />
              </div>
            </div>

            {showAvatarPicker && (
              <div className="grid grid-cols-8 gap-2 mb-5 p-3 bg-stone-50 rounded-xl">
                {AVATARS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => { setAvatar(emoji); setShowAvatarPicker(false) }}
                    className="w-9 h-9 rounded-lg text-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                    style={{ backgroundColor: avatar === emoji ? '#FEF0E9' : 'transparent' }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500">Цель</label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Например: готовлюсь к собеседованию на middle"
                maxLength={80}
                className="w-full text-sm text-gray-700 bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 outline-none focus:border-stone-400 transition-colors placeholder-gray-400"
              />
            </div>

            <button
              onClick={handleSave}
              className="mt-4 w-full py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: saved ? '#22C55E' : '#E8703A' }}
            >
              {saved ? '✓ Сохранено' : 'Сохранить'}
            </button>
          </div>

          {/* Progress block */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">Прогресс</h2>
              <button
                onClick={() => setConfirmReset('all')}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors"
              >
                Сбросить всё
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {levels.map((level) => {
                const total = questionsByLevel(level).length
                const done = progress[level].completed.length
                const percent = total > 0 ? Math.round((done / total) * 100) : 0
                const color = LEVEL_COLORS[level]

                return (
                  <div key={level}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-gray-700">{LEVEL_LABELS[level]}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400">{done} / {total}</span>
                        {done > 0 && (
                          <button
                            onClick={() => setConfirmReset(level)}
                            className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                          >
                            Сбросить
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${percent}%`, backgroundColor: color }}
                      />
                    </div>
                    <p className="text-right text-xs text-gray-400 mt-1">{percent}%</p>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </main>

      {/* Confirm reset modal */}
      {confirmReset && (
        <div className="fixed inset-0 flex items-center justify-center px-6" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              {confirmReset === 'all' ? 'Сбросить весь прогресс?' : `Сбросить прогресс ${LEVEL_LABELS[confirmReset]}?`}
            </h3>
            <p className="text-sm text-gray-500 mb-5">Это действие нельзя отменить.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmReset(null)}
                className="flex-1 py-2.5 rounded-xl border border-stone-200 text-sm font-medium text-gray-700 hover:bg-stone-50 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={() => handleReset(confirmReset)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#EF4444' }}
              >
                Сбросить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
