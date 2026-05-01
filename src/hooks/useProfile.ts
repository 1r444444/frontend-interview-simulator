import { useState } from 'react'
import type { Profile } from '../types'

const STORAGE_KEY = 'fis_profile'

const defaultProfile = (): Profile => ({
  name: '',
  goal: '',
  avatar: '🧑‍💻',
})

function loadProfile(): Profile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...defaultProfile(), ...JSON.parse(raw) } : defaultProfile()
  } catch {
    return defaultProfile()
  }
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(loadProfile)

  function saveProfile(p: Profile) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
    setProfile(p)
  }

  return { profile, saveProfile }
}
