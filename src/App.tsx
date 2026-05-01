import { useState } from 'react'
import type { Level, Profile } from './types'
import { questionsByLevel } from './data/questions'
import { useProgress } from './hooks/useProgress'
import { useProfile } from './hooks/useProfile'
import { WelcomePage } from './components/WelcomePage'
import { LevelSelect } from './components/LevelSelect'
import { QuizScreen } from './components/QuizScreen'
import { ResultsScreen } from './components/ResultsScreen'
import { ProfilePage } from './components/ProfilePage'

type Screen = 'welcome' | 'level' | 'quiz' | 'results' | 'profile'

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const [level, setLevel] = useState<Level | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const { progress, markCompleted, resetLevel, resetAll } = useProgress()
  const { profile, saveProfile } = useProfile()

  function handleStartQuiz() {
    if (!selectedLevel) return
    setLevel(selectedLevel)
    setScore({ correct: 0, total: 0 })
    setScreen('quiz')
  }

  function handleFinish(correct: number, total: number) {
    setScore({ correct, total })
    setScreen('results')
  }

  function handleRestart() {
    if (!level) return
    resetLevel(level)
    setScore({ correct: 0, total: 0 })
    setScreen('quiz')
  }

  function handleSaveProfile(p: Profile) {
    saveProfile(p)
  }

  return (
    <>
      {screen === 'welcome' && (
        <WelcomePage
          profile={profile}
          onStart={() => setScreen('level')}
          onProfile={() => setScreen('profile')}
        />
      )}

      {screen === 'level' && (
        <LevelSelect
          selectedLevel={selectedLevel}
          onSelect={setSelectedLevel}
          onStart={handleStartQuiz}
        />
      )}

      {screen === 'quiz' && level && (
        <QuizScreen
          level={level}
          questions={questionsByLevel(level)}
          completedIds={progress[level].completed}
          onComplete={(id) => markCompleted(level, id)}
          onFinish={handleFinish}
          onBack={() => setScreen('level')}
        />
      )}

      {screen === 'results' && level && (
        <ResultsScreen
          level={level}
          correct={score.correct}
          total={score.total}
          onRestart={handleRestart}
          onBack={() => setScreen('welcome')}
        />
      )}

      {screen === 'profile' && (
        <ProfilePage
          profile={profile}
          progress={progress}
          onSave={handleSaveProfile}
          onResetLevel={resetLevel}
          onResetAll={resetAll}
          onBack={() => setScreen('welcome')}
        />
      )}
    </>
  )
}
