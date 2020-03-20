import { Point } from '../../types'

/*********************
 * Common Prop Types *
 *********************/
export interface MatterBodyProps {
  id: number
  type: string
  label: string
  gameObject: Phaser.GameObjects.GameObject
  parts: any[]
  plugin: object
  angle: number
  vertices: any[]
  position: Point
  force: Point
  torque: number
  positionImpulse: Point
  previousPositionImpulse: Point
  constraintImpulse: { x: number; y: number; angle: number }
  speed: number
  angularSpeed: number
  velocity: Point
  angularVelocity: number
  isSensor: boolean
  isStatic: boolean
  isSleeping: boolean
  ignoreGravity: boolean
  ignorePointer: boolean
  motion: number
  sleepThreshold: number
  density: number
  restitution: number
  friction: number
  frictionStatic: number
  frictionAir: number
  collisionFilter: {
    category: number
    mask: number
    group: number
  }
  bounds: any
  circleRadius: number
  mass: number
  inertia: number
}

export interface MatterBounceProps {
  bounce?: number
}

export interface MatterCollisionProps {
  collidesWith?: number[] // force an array for better change detection
  collisionCategory?: number
  collisionGroup?: number
}

export interface MatterForceProps {
  force?: Point
  forceFrom?: {
    position: Point
    force: Point
  }
  thrust?: number
  thrustBack?: number
  thrustLeft?: number
  thrustRight?: number
}

export interface MatterFrictionProps {
  friction?: number
  frictionAir?: number
  frictionStatic?: number
}

export interface MatterGravityProps {
  ignoreGravity?: boolean
}

export interface MatterMassProps {
  density?: number
  mass?: number
}

export interface MatterSensorProps {
  sensor?: boolean
}

export interface MatterCircleProps {
  radius: number
  options?: object
}
export interface MatterRectangleProps {
  width: number
  height: number
  options?: object
}
export interface MatterPolygonProps {
  radius: number
  sides: number
  options?: object
}
export interface MatterTrapezoidProps {
  width: number
  height: number
  slope: number
  options?: object
}
export interface MatterSetBodyProps {
  // body?: {
  //   config: object
  //   options?: object
  // }
  circle?: MatterCircleProps
  polygon?: MatterPolygonProps
  rectangle?: MatterRectangleProps
  trapezoid?: MatterTrapezoidProps
}

export interface MatterSleepProps {
  sleep?: {
    start?: boolean
    end?: boolean
    threshold?: number
  }
}

export interface MatterStaticProps {
  static?: boolean
}

export interface MatterVelocityProps {
  velocity?: number | Point
  velocityX?: number
  velocityY?: number
  angularVelocity?: number
}

export type MatterTransformProps = Partial<
  Pick<
    Phaser.GameObjects.Components.Transform,
    'angle' | 'rotation' | 'x' | 'y' | 'z' | 'w'
  > & {
    scale?: number | (Point & { point?: Point })
    allowRotation?: boolean
  }
>
