import * as Phaser from 'phaser'
import { applyDefaultProps } from '../../utils/props'
import {
  AlphaProps,
  BlendModeProps,
  ComputedSizeProps,
  DepthProps,
  FlipProps,
  OriginProps,
  PipelineProps,
  ScrollFactorProps,
  TransformProps,
  VisibleProps,
  MaskProps,
  TintProps,
  GameObjectProps,
  ArcadeAccelerationProps,
  ArcadeAngularProps,
  ArcadeBounceProps,
  ArcadeDebugProps,
  ArcadeEnableProps,
  ArcadeDragProps,
  ArcadeFrictionProps,
  ArcadeGravityProps,
  ArcadeImmovableProps,
  ArcadeMassProps,
  ArcadeSizeProps,
  ArcadeVelocityProps,
} from '..'
import { CreatePhaserComponentConfig } from '../../utils/element'
import pick from '../../utils/helpers/pick'
import omit from 'lodash.omit'
import { ArcadeColliderProps } from '../ArcadeCollider/ArcadeCollider'

export interface ArcadeImageProps
  extends GameObjectProps<Phaser.Physics.Arcade.Image>,
    AlphaProps,
    BlendModeProps,
    ComputedSizeProps,
    DepthProps,
    FlipProps,
    MaskProps,
    OriginProps,
    PipelineProps,
    ScrollFactorProps,
    TintProps,
    TransformProps,
    VisibleProps,
    ArcadeAccelerationProps,
    ArcadeAngularProps,
    ArcadeBounceProps,
    ArcadeDebugProps,
    ArcadeEnableProps,
    ArcadeDragProps,
    ArcadeFrictionProps,
    ArcadeGravityProps,
    ArcadeImmovableProps,
    ArcadeMassProps,
    ArcadeSizeProps,
    ArcadeVelocityProps {
  texture: string
  x: number
  y: number
  frame?: string | number
}

const ArcadeImage: CreatePhaserComponentConfig<
  Phaser.Physics.Arcade.Image,
  ArcadeImageProps
> = {
  create: ({ x, y, texture, frame }, scene) => {
    const img = new Phaser.Physics.Arcade.Image(scene, x, y, texture, frame)
    scene.physics.add.existing(img)

    return img
  },
  applyProps: (instance, oldProps, newProps) => {
    const { texture, frame, ...props } = newProps

    if (texture !== oldProps.texture) {
      instance.setTexture(texture)
    }

    if (frame !== oldProps.frame) {
      instance.setFrame(frame)
    }

    applyDefaultProps(instance, oldProps, props)
    applyPhysicsProps(instance, oldProps, props)
  },
}

export function applyPhysicsProps(
  instance: Phaser.Physics.Arcade.Image,
  oldProps: ArcadeImageProps,
  newProps: Partial<ArcadeImageProps>
) {
  const oldBounce = convertToPoint(oldProps.bounce)
  const newBounce = convertToPoint(newProps.bounce)
  if (oldBounce.x !== newBounce.x || oldBounce.y !== newBounce.y) {
    instance.setBounce(newBounce.x, newBounce.y)
  }

  if (oldProps.collideWorldBounds !== newProps.collideWorldBounds) {
    instance.setCollideWorldBounds(newProps.collideWorldBounds)
  }

  if (
    oldProps.debugShowBody !== newProps.debugShowBody ||
    oldProps.debugShowVelocity !== newProps.debugShowVelocity ||
    oldProps.debugBodyColor !== newProps.debugBodyColor
  ) {
    instance.setDebug(
      newProps.debugShowBody,
      newProps.debugShowVelocity,
      newProps.debugBodyColor
    )
  }

  if (oldProps.immovable !== newProps.immovable) {
    instance.setImmovable(newProps.immovable)
  }
}

function convertToPoint(num: number | { x: number; y: number }) {
  if (typeof num === 'number') {
    return { x: num, y: num }
  }

  if (!num) {
    return { x: 0, y: 0 }
  }

  return num
}

export default ArcadeImage
