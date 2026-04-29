interface Props {
  current: number
  total: number
}

export function ProgressBar({ current, total }: Props) {
  const percent = total === 0 ? 0 : Math.round((current / total) * 100)

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-gray-500 mb-1">
        <span>Question {current} of {total}</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-violet-500 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
