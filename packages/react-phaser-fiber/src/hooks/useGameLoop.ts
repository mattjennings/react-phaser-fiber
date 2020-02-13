import { useGame } from './useGame'
import { useEffect } from 'react'

/**
 * Runs the callback once every "step" event
 *
 * note: this is shorthand for useGameEvent("step", callback)
 */
export function useGameLoop(
  onLoop: ({ delta, time }: { delta: number; time: number }) => any
) {
  const game = useGame()

  useEffect(() => {
    const callback = (time: number, delta: number) => {
      onLoop({ delta, time })
    }
    game.events.on('step', callback)

    return () => {
      game.events.off('step', callback)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLoop])
}
