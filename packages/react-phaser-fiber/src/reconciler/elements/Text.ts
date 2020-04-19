import { CreatePhaserComponentConfig } from '../element'
import {
  AlphaProps,
  applyBlendModeProps,
  applyCropProps,
  applyDepthProps,
  applyFlipProps,
  applyMaskProps,
  applyOriginProps,
  applyPipelineProps,
  applyScrollFactorProps,
  applyTintProps,
  applyTransformProps,
  applyVisibleProps,
  BlendModeProps,
  DepthProps,
  FlipProps,
  MaskProps,
  OriginProps,
  PipelineProps,
  ScrollFactorProps,
  SizeProps,
  TintProps,
  TransformProps,
  VisibleProps,
  CropProps,
  applyGameObjectProps,
  GameObjectProps,
  applyAlphaProps,
  applySizeProps,
} from '../props'
import { iterateProps } from '../util/iterateProps'
import isEqual from 'fast-deep-equal'

export interface TextElementProps
  extends GameObjectProps<Phaser.GameObjects.Text>,
    AlphaProps,
    BlendModeProps,
    SizeProps,
    CropProps,
    DepthProps,
    FlipProps,
    MaskProps,
    OriginProps,
    PipelineProps,
    ScrollFactorProps,
    TintProps,
    TransformProps,
    VisibleProps,
    Phaser.Types.GameObjects.Text.TextStyle {
  instance: Phaser.GameObjects.Text
  scene: Phaser.Scene
  text?: string | string[]

  /**
   * Applies styles to the Text.
   *
   * This is no longer the recommended way to apply styles.
   * Instead, you can apply each individual style as their own prop.
   *
   * @deprecated since 0.3.0
   */
  style?: Phaser.Types.GameObjects.Text.TextStyle
}

export const TextElement: CreatePhaserComponentConfig<
  Phaser.GameObjects.Text,
  TextElementProps
> = {
  create: ({ instance }) => {
    return instance
  },
  applyProps: (instance, oldProps, newProps) => {
    // apply text props
    iterateProps(oldProps, newProps, (key, newValue, oldValue) => {
      switch (key) {
        case 'text':
          instance.setText(newValue as string)
          break
        case 'style':
          instance.setStyle(newValue as Phaser.Types.GameObjects.Text.TextStyle)
          break
        case 'fontFamily':
          instance.setFontFamily(newValue)
          break
        case 'fontSize':
          instance.setFontSize(newValue)
          break
        case 'fontStyle':
          instance.setFontStyle(newValue)
          break
        case 'backgroundColor':
          instance.setBackgroundColor(newValue)
          break
        case 'color':
          instance.setColor(newValue)
          break
        case 'stroke':
          instance.setStroke(newValue, instance.style.strokeThickness)
          break
        case 'strokeThickness':
          instance.setStroke(instance.style.stroke, newValue)
          break
        case 'align':
          instance.setAlign(newValue)
          break
        case 'maxLines':
          instance.setMaxLines(newValue)
          break
        case 'fixedWidth':
          instance.setFixedSize(newValue, instance.style.fixedHeight ?? 0)
          break
        case 'fixedHeight':
          instance.setFixedSize(instance.style.fixedWidth ?? 0, newValue)
          break
        case 'resolution':
          instance.setResolution(newValue)
          break
        case 'baselineX':
          instance.style.baselineX = newValue
          break
        case 'baselineY':
          instance.style.baselineY = newValue
          break
        case 'rtl':
          instance.style.rtl = newValue
          break
        case 'shadow': {
          const value = newValue as Phaser.Types.GameObjects.Text.TextShadow
          if (!isEqual(oldValue, value)) {
            instance.setShadow(
              value.offsetX,
              value.offsetY,
              value.color,
              value.blur,
              value.stroke,
              value.fill
            )
          }
          break
        }
        case 'padding': {
          const value = newValue as Phaser.Types.GameObjects.Text.TextPadding
          if (!isEqual(oldValue, value)) {
            instance.setPadding(
              value.left,
              value.top,
              value.right,
              value.bottom
            )
          }
          break
        }
        case 'wordWrap': {
          const value = newValue as Phaser.Types.GameObjects.Text.TextWordWrap
          if (!isEqual(oldValue, value)) {
            instance.setWordWrapWidth(value.width, value.useAdvancedWrap)
          }
          break
        }
        case 'metrics': {
          const value = newValue as Phaser.Types.GameObjects.Text.TextMetrics
          if (!isEqual(oldValue, value)) {
            // @ts-ignore - not in ts definitions
            instance.style.metrics = value
          }
          break
        }
      }
    })

    applyGameObjectProps(instance, oldProps, newProps)
    applyAlphaProps(instance, oldProps, newProps)
    applyBlendModeProps(instance, oldProps, newProps)
    applyCropProps(instance, oldProps, newProps)
    applyDepthProps(instance, oldProps, newProps)
    applyFlipProps(instance, oldProps, newProps)
    applyMaskProps(instance, oldProps, newProps)
    applyOriginProps(instance, oldProps, newProps)
    applyPipelineProps(instance, oldProps, newProps)
    applySizeProps(instance, oldProps, newProps)
    applyScrollFactorProps(instance, oldProps, newProps)
    applyTintProps(instance, oldProps, newProps)
    applyTransformProps(instance, oldProps, newProps)
    applyVisibleProps(instance, oldProps, newProps)
  },
}
