import * as Phaser from 'phaser'
import { applyDefaultProps } from '../../utils/props'

export interface TextProps {
  x: number
  y: number
  text: string | string[]
  style: Phaser.Types.GameObjects.Text.TextStyle
}

function Text(root: Phaser.Scene, { text, x, y, style }: TextProps) {
  const obj = new Phaser.GameObjects.Text(root, x, y, text, style)

  // @ts-ignore
  obj.applyProps = (
    instance: Phaser.GameObjects.Text,
    oldProps: TextProps,
    newProps: TextProps
  ) => {
    const { style, ...props } = newProps

    applyDefaultProps(instance, oldProps, props)

    if (oldProps.style !== newProps.style) {
      instance.setStyle(style)
    }
  }

  return obj
}

// function differingKeys<T, K extends keyof T>(
//   oldProps: T,
//   newProps: T,
//   callback: (key: K, oldValue: any, newValue: any) => any
// ) {
//   const allKeys = [...Object.keys(oldProps), ...Object.keys(newProps)].filter(
//     (val, i, arr) => arr.indexOf(val) === i
//   ) as K[]

//   allKeys.forEach(key => {
//     if (oldProps[key] !== newProps[key]) {
//       callback(key, oldProps[key], newProps[key])
//     }
//   })
// }

export default Text
