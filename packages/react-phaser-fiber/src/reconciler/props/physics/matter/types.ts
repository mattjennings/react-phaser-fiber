import { Point } from '../../types'
import { TransformProps } from '../../gameobjects'

/*********************
 * Common Prop Types *
 *********************/
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
  options?: Phaser.Types.Physics.Matter.MatterBodyConfig
}
export interface MatterRectangleProps {
  width: number
  height: number
  options?: Phaser.Types.Physics.Matter.MatterBodyConfig
}
export interface MatterPolygonProps {
  radius: number
  sides: number
  options?: Phaser.Types.Physics.Matter.MatterBodyConfig
}
export interface MatterTrapezoidProps {
  width: number
  height: number
  slope: number
  options?: Phaser.Types.Physics.Matter.MatterBodyConfig
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

export interface MatterTransformProps extends TransformProps {
  fixedRotation?: boolean
}
