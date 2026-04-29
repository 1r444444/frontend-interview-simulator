import { useState } from 'react'
import type { Profile } from '../types'

const STORAGE_KEY = 'fis_profile'

function loadProfile(): Profile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(loadProfile)

  function saveProfile(p: Profile) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
    setProfile(p)
  }

  function clearProfile() {
    localStorage.removeItem(STORAGE_KEY)
    setProfile(null)
  }

  return { profile, saveProfile, clearProfile }
}
