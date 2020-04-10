import React, { useLayoutEffect } from 'react'
import { useGameObject, useScene } from '../hooks'
import {
  ArcadeAccelerationProps,
  ArcadeAngularProps,
  ArcadeDragProps,
  ArcadeBodyProps,
  ArcadeBounceProps,
  ArcadeDebugProps,
  ArcadeFrictionProps,
  ArcadeGravityProps,
  ArcadeImmovableProps,
  ArcadeMassProps,
  ArcadeSizeProps,
  ArcadeVelocityProps,
  applyArcadeAccelerationProps,
  applyArcadeBodyProps,
  applyArcadeAngularProps,
  applyArcadeBounceProps,
  applyArcadeDebugProps,
  applyArcadeDragProps,
  applyArcadeFrictionProps,
  applyArcadeGravityProps,
  applyArcadeImmovableProps,
  applyArcadeMassProps,
  applyArcadeSizeProps,
  applyArcadeVelocityProps,
} from '../reconciler'
import { usePrevious } from '../hooks/usePrevious'

export type ArcadePhysicsProps = ArcadeAccelerationProps &
  ArcadeAngularProps &
  ArcadeBodyProps &
  ArcadeBounceProps &
  ArcadeDebugProps &
  ArcadeDragProps &
  ArcadeFrictionProps &
  ArcadeGravityProps &
  ArcadeImmovableProps &
  ArcadeMassProps &
  ArcadeSizeProps &
  ArcadeVelocityProps

/**
 * Adds the parent GameObject into Arcade physics
 */
export default function ArcadePhysics(props: ArcadePhysicsProps) {
  const gameObject = useGameObject()
  const scene = useScene()
  const prevProps = usePrevious(props)

  if (!gameObject) {
    throw Error('ArcadePhysics must be used within a GameObject')
  }

  if (!scene.physics) {
    throw Error('ArcadePhysics requires Game to be using arcade physics')
  }

  useLayoutEffect(() => {
    scene.physics.world.enable(
      gameObject,
      props.physicsType === 'static'
        ? Phaser.Physics.Arcade.STATIC_BODY
        : Phaser.Physics.Arcade.DYNAMIC_BODY
    )

    return () => {
      if (scene.children.exists(gameObject)) {
        scene.physics.world.disable(gameObject)
      }
    }
  }, [])

  useLayoutEffect(() => {
    const oldProps = prevProps ?? {}
    const body = gameObject.body as Phaser.Physics.Arcade.Body

    applyArcadeAccelerationProps(body, oldProps, props)
    applyArcadeAngularProps(body, oldProps, props)
    applyArcadeBounceProps(body, oldProps, props)
    applyArcadeDebugProps(body as any, oldProps, props)
    applyArcadeDragProps(body as any, oldProps, props)
    applyArcadeFrictionProps(body, oldProps, props)
    applyArcadeGravityProps(body, oldProps, props)
    applyArcadeImmovableProps(body, oldProps, props)
    applyArcadeMassProps(body, oldProps, props)
    applyArcadeSizeProps(body, oldProps, props)
    applyArcadeVelocityProps(body, oldProps, props)
    applyArcadeBodyProps(gameObject as any, oldProps, props)
  }, [props])

  return null as JSX.Element
}
