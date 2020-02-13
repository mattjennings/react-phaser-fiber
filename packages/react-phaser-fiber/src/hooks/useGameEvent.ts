import { useGame } from './useGame'
import { useEffect } from 'react'

export function useGameEvent(
  event: string,
  onEvent: (...eventArgs: any) => any
) {
  const game = useGame()

  useEffect(() => {
    game.events.on(event, onEvent)

    return () => {
      game.events.off(event, onEvent)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onEvent])
}
