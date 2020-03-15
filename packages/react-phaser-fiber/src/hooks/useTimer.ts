import { useScene } from './useScene'
import { useLayoutEffect, useRef, useEffect } from 'react'
import Phaser from 'phaser'

/**
 * Creates a Phaser.Time.TimerEvent
 */
export function useTimer(
  callback: () => any,
  ms: number,
  config: Pick<
    Phaser.Types.Time.TimerEventConfig,
    'loop' | 'repeat' | 'timeScale' | 'startAt' | 'paused'
  > = {}
) {
  const scene = useScene()
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  })

  useLayoutEffect(() => {
    function tick() {
      callbackRef.current()
    }

    const timer = scene.time.addEvent({
      callback: tick,
      loop: config.loop,
      repeat: config.repeat,
      timeScale: config.timeScale,
      startAt: config.startAt,
      paused: config.paused,
      delay: ms,
    })

    return () => {
      timer.destroy()
    }
  }, [
    ms,
    config.loop,
    config.repeat,
    config.timeScale,
    config.startAt,
    config.paused,
  ])
}
