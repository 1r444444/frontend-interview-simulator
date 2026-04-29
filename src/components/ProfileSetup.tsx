import { useState } from 'react'
import type { Profile } from '../types'

const AVATARS = [
  '🦊', '🐼', '🐨', '🦁', '🐯', '🐸',
  '🦄', '🐙', '🦋', '🐬', '🦅', '🐺',
  '🧑‍💻', '👩‍💻', '🧙', '🥷', '🧑‍🚀', '🦸',
  '🍀', '⚡', '🔥', '💎', '🌙', '🎯',
]

interface Props {
  onSave: (profile: Profile) => void
}

export function ProfileSetup({ onSave }: Props) {
  const [avatar, setAvatar] = useState(AVATARS[0])
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const name = username.trim()
    if (name.length < 2) {
      setError('Name must be at least 2 characters')
      return
    }
    onSave({ avatar, username: name })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome!</h1>
          <p className="text-gray-500">Set up your profile to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="text-center mb-5">
            <div className="text-6xl mb-2">{avatar}</div>
            <p className="text-xs text-gray-400 mb-3">Choose your avatar</p>
            <div className="grid grid-cols-6 gap-2">
              {AVATARS.map((em) => (
                <button
                  key={em}
                  type="button"
                  onClick={() => setAvatar(em)}
                  className={`text-xl p-1.5 rounded-xl transition-all ${
                    avatar === em
                      ? 'bg-violet-100 ring-2 ring-violet-400 scale-110'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              Your name
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError('') }}
              placeholder="e.g. Irina"
              maxLength={20}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors"
          >
            Get Started →
          </button>
        </form>
      </div>
    </div>
  )
}
