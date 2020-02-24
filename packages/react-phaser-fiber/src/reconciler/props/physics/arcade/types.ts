import { Point } from '../../types'

export interface ArcadeAccelerationProps {
  accelerationX?: number
  accelerationY?: number
  acceleration?: number | Point
}

export interface ArcadeAngularProps {
  angularAcceleration?: number
  angularDrag?: number
  angularVelocity?: number
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ArcadeBodyProps {
  allowDrag?: boolean
  allowGravity?: boolean
  allowRotation?: boolean
  onWorldBounds?: boolean
  // todo
  // https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Body.html#toc3__anchor
}

export interface ArcadeBounceProps {
  bounceX?: number
  bounceY?: number
  bounce?: number | Point
  collideWorldBounds?: boolean
}

export interface ArcadeDebugProps {
  debug?: {
    bodyColor?: number
    showBody?: boolean
    showVelocity?: boolean
  }
}

export interface ArcadeDragProps {
  damping?: boolean
  dragX?: number
  dragY?: number
  drag?: number | Point
}

export interface ArcadeEnableProps {
  /**
   * Disables the Body
   */
  disableBody?:
    | boolean
    | {
        disableGameObject?: boolean
        hideGameObject?: boolean
      }
}

export interface ArcadeFrictionProps {
  frictionX?: number
  frictionY?: number
  friction?: number | Point
}

export interface ArcadeGravityProps {
  gravityX?: number
  gravityY?: number
  gravity?: number | Point
}

export interface ArcadeImmovableProps {
  immovable?: boolean
}

export interface ArcadeMassProps {
  mass?: number
}

export interface ArcadeSizeProps {
  circle?: {
    radius: number
    offsetX?: number
    offsetY?: number
  }
  offset?: Point
  size?: {
    width: number
    height: number
    center?: number
  }
}

export interface ArcadeVelocityProps {
  velocity?: number | Point
  velocityX?: number
  velocityY?: number
  maxVelocity?: number | Point
}
