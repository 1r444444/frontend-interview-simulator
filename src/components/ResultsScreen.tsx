import type { Topic } from '../types'

interface Props {
  topic: Topic
  total: number
  onRestart: () => void
  onBack: () => void
}

export function ResultsScreen({ topic, total, onRestart, onBack }: Props) {
  const topicLabel = { javascript: 'JavaScript', typescript: 'TypeScript', react: 'React' }[topic]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Topic complete!
        </h2>
        <p className="text-gray-500 mb-8">
          You went through all {total} {topicLabel} questions.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onRestart}
            className="w-full py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors"
          >
            Practice Again
          </button>
          <button
            onClick={onBack}
            className="w-full py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Choose Another Topic
          </button>
        </div>
      </div>
    </div>
  )
}
