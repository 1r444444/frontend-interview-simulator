import type { Topic, Progress } from '../types'
import { questionsByTopic } from '../data/questions'

const TOPICS: { id: Topic; label: string; color: string; bg: string; icon: string }[] = [
  { id: 'javascript', label: 'JavaScript', color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100', icon: 'JS' },
  { id: 'typescript', label: 'TypeScript', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200 hover:bg-blue-100', icon: 'TS' },
  { id: 'react', label: 'React', color: 'text-cyan-700', bg: 'bg-cyan-50 border-cyan-200 hover:bg-cyan-100', icon: '⚛' },
]

interface Props {
  progress: Progress
  onStart: (topic: Topic) => void
  onReset: (topic: Topic) => void
}

export function LandingPage({ progress, onStart, onReset }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Frontend Interview Simulator
          </h1>
          <p className="text-gray-500 text-lg">
            Practice JavaScript, TypeScript and React interviews
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {TOPICS.map(({ id, label, color, bg, icon }) => {
            const total = questionsByTopic(id).length
            const done = progress[id].completed.length
            const percent = Math.round((done / total) * 100)

            return (
              <div key={id} className={`border rounded-2xl p-5 ${bg} transition-colors`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className={`text-lg font-bold ${color} w-8`}>{icon}</span>
                    <span className={`text-lg font-semibold ${color}`}>{label}</span>
                  </div>
                  <span className="text-sm text-gray-500">{done}/{total} done</span>
                </div>

                <div className="w-full h-1.5 bg-white/70 rounded-full mb-4 overflow-hidden">
                  <div
                    className="h-full bg-current rounded-full transition-all"
                    style={{ width: `${percent}%`, color: 'rgb(139 92 246)' }}
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onStart(id)}
                    className="flex-1 py-2 rounded-xl bg-white border border-gray-200 text-gray-800 font-medium hover:bg-gray-50 transition-colors text-sm"
                  >
                    {done > 0 && done < total ? 'Continue' : done === total ? 'Restart' : 'Start'}
                  </button>
                  {done > 0 && (
                    <button
                      onClick={() => onReset(id)}
                      className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors text-sm"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Progress is saved in your browser
        </p>
      </div>
    </div>
  )
}
