import { useState, useEffect, useRef } from 'react'

export function useTimer(initial: number, onExpire?: () => void) {
  const [timeLeft, setTimeLeft] = useState(initial)
  const [running, setRunning] = useState(false)
  const onExpireRef = useRef(onExpire)
  onExpireRef.current = onExpire

  useEffect(() => {
    if (!running) return
    if (timeLeft <= 0) {
      setRunning(false)
      onExpireRef.current?.()
      return
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearTimeout(id)
  }, [running, timeLeft])

  function start() {
    setRunning(true)
  }

  function reset(value = initial) {
    setRunning(false)
    setTimeLeft(value)
  }

  return { timeLeft, running, start, reset }
}
