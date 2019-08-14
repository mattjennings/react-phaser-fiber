import * as Phaser from 'phaser'
import { applyDefaultProps } from '../../utils/props'
import setApplyProps from '../../utils/setApplyProps'

export interface TextProps {
  x: number
  y: number
  text: string | string[]
  style: Phaser.Types.GameObjects.Text.TextStyle
}

function Text(root: Phaser.Scene, { text, x, y, style }: TextProps) {
  const obj = new Phaser.GameObjects.Text(root, x, y, text, style)

  setApplyProps<Phaser.GameObjects.Text, TextProps>(
    obj,
    (instance, oldProps, newProps) => {
      const { style, ...props } = newProps

      applyDefaultProps(instance, oldProps, props)

      if (oldProps.style !== newProps.style) {
        instance.setStyle(style)
      }
    }
  )

  return obj
}

export default Text
