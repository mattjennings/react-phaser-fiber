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
  allowRotation?: boolean
  allowDrag?: boolean
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
  disableBody?: boolean

  /**
   * If disableBody is true, this will also hide the body
   */
  hideBody?: boolean
}

export interface ArcadeFrictionProps {
  frictionX?: number
  frictionY?: number
  friction?: number | Point
}

export interface ArcadeGravityProps {
  allowGravity?: boolean
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
  offset?: {
    x?: number
    y?: number
  }
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
