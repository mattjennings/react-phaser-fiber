import useGame from './useGame'
import { useEffect } from 'react'

export default function useGameLoop(
  onLoop: ({ delta, time }: { delta: number; time: number }) => any
) {
  const game = useGame()

  useEffect(() => {
    const listener = game.events.on('step', (time: number, delta: number) => {
      onLoop({ delta, time })
    })

    return () => {
      listener.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLoop])
}
