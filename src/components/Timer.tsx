interface Props {
  timeLeft: number
  total: number
}

export function Timer({ timeLeft, total }: Props) {
  const percent = (timeLeft / total) * 100
  const urgent = timeLeft <= 10

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3" />
          <circle
            cx="18" cy="18" r="15.9" fill="none"
            stroke={urgent ? '#ef4444' : '#8b5cf6'}
            strokeWidth="3"
            strokeDasharray={`${(percent * 99.9) / 100} 100`}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center text-sm font-semibold ${urgent ? 'text-red-500' : 'text-gray-700'}`}>
          {timeLeft}
        </span>
      </div>
    </div>
  )
}
