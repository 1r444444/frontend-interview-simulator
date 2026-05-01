interface Props {
  onStart: () => void
}

export function WelcomePage({ onStart }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16" style={{ backgroundColor: '#FAF8F5' }}>
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Frontend Interview Simulator
        </h1>
        <p className="text-gray-500 text-lg mb-12 leading-relaxed">
          Практикуйтесь в прохождении технических интервью с AI-ассистентом.<br />
          Получайте подсказки, обратную связь и улучшайте свои навыки.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          <FeatureCard
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            }
            title="Разные типы вопросов"
            description="Теория, задачи на код и вопросы с вариантами ответов"
          />
          <FeatureCard
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="2" />
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            }
            title="AI-подсказки"
            description="Получайте помощь от искусственного интеллекта в реальном времени"
          />
          <FeatureCard
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            }
            title="Голосовой ввод"
            description="Отвечайте голосом, как на настоящем интервью"
          />
        </div>

        <button
          onClick={onStart}
          className="px-10 py-4 rounded-2xl text-white font-semibold text-base transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: '#E8703A' }}
        >
          Начать практику
        </button>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 text-left">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#FEF0E9', color: '#E8703A' }}>
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900 mb-2 text-base leading-snug">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  )
}
