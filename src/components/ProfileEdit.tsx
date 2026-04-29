import { useState } from 'react'
import type { Profile } from '../types'

const AVATARS = [
  '🦊', '🐼', '🐨', '🦁', '🐯', '🐸',
  '🦄', '🐙', '🦋', '🐬', '🦅', '🐺',
  '🧑‍💻', '👩‍💻', '🧙', '🥷', '🧑‍🚀', '🦸',
  '🍀', '⚡', '🔥', '💎', '🌙', '🎯',
]

interface Props {
  profile: Profile
  onSave: (profile: Profile) => void
  onClose: () => void
  onReset: () => void
}

export function ProfileEdit({ profile, onSave, onClose, onReset }: Props) {
  const [avatar, setAvatar] = useState(profile.avatar)
  const [username, setUsername] = useState(profile.username)
  const [error, setError] = useState('')
  const [confirmReset, setConfirmReset] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const name = username.trim()
    if (name.length < 2) {
      setError('Name must be at least 2 characters')
      return
    }
    onSave({ avatar, username: name })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="text-center mb-5">
            <div className="text-5xl mb-2">{avatar}</div>
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

          <div className="mb-5">
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              Your name
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError('') }}
              maxLength={20}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors mb-3"
          >
            Save
          </button>
        </form>

        <div className="border-t border-gray-100 pt-3">
          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              className="w-full py-2 text-sm text-gray-400 hover:text-red-500 transition-colors"
            >
              Reset all progress
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmReset(false)}
                className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={onReset}
                className="flex-1 py-2 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 hover:bg-red-100"
              >
                Yes, reset
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
