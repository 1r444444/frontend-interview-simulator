import { useState } from 'react'
import type { Topic } from './types'
import { questionsByTopic } from './data/questions'
import { useProgress } from './hooks/useProgress'
import { LandingPage } from './components/LandingPage'
import { QuizScreen } from './components/QuizScreen'
import { ResultsScreen } from './components/ResultsScreen'

type Screen = 'landing' | 'quiz' | 'results'

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [topic, setTopic] = useState<Topic | null>(null)
  const { progress, markCompleted, resetTopic } = useProgress()

  function startTopic(t: Topic) {
    setTopic(t)
    setScreen('quiz')
  }

  function handleFinish() {
    setScreen('results')
  }

  function handleRestart() {
    if (topic) {
      resetTopic(topic)
      setScreen('quiz')
    }
  }

  if (screen === 'landing' || !topic) {
    return (
      <LandingPage
        progress={progress}
        onStart={startTopic}
        onReset={resetTopic}
      />
    )
  }

  if (screen === 'results') {
    return (
      <ResultsScreen
        topic={topic}
        total={questionsByTopic(topic).length}
        onRestart={handleRestart}
        onBack={() => setScreen('landing')}
      />
    )
  }

  return (
    <QuizScreen
      topic={topic}
      questions={questionsByTopic(topic)}
      completedIds={progress[topic].completed}
      onComplete={(id) => markCompleted(topic, id)}
      onFinish={handleFinish}
      onBack={() => setScreen('landing')}
    />
  )
}
