import * as Phaser from 'phaser'
import {
  applyDefaultProps,
  applyArcadePhysicsProps,
} from '../../utils/applyProps'
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
  texture?: string
  frame?: string | number
}

const ArcadeImage: CreatePhaserComponentConfig<
  Phaser.Physics.Arcade.Image,
  ArcadeImageProps
> = {
  create: ({ x, y, initialX, initialY, texture, frame }, scene) => {
    const img = new Phaser.Physics.Arcade.Image(
      scene,
      typeof initialX !== undefined ? initialX : x,
      typeof initialY !== undefined ? initialY : y,
      texture,
      frame
    )
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
    applyArcadePhysicsProps(instance, oldProps, props)
  },
}

export default ArcadeImage
