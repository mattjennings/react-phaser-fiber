import { createPhaserComponent, applyDefaultProps } from 'react-phaser'

export interface LineProps {
  from: {
    x: number
    y: number
  }
  to: {
    x: number
    y: number
  }
  color: number
}

// Example of creating a custom component
const Line = createPhaserComponent<Phaser.GameObjects.Graphics, LineProps>(
  'Line',
  {
    create: (props, scene) => {
      return new Phaser.GameObjects.Graphics(scene)
    },
    applyProps: (graphics, oldProps, newProps) => {
      const { from, to, color, ...props } = newProps
      graphics.clear()

      graphics.lineStyle(5, color, 1.0)
      graphics.beginPath()
      graphics.moveTo(from.x, from.y)
      graphics.lineTo(to.x, to.y)
      graphics.closePath()
      graphics.strokePath()

      applyDefaultProps(graphics, oldProps, props)
    },
  }
)

export default Line
