import React from 'react'
import { render, wait } from '@testing-library/react'
import Game from './Game'
import Text from './Text'
import Scene from './Scene'

const wrapper = (props: any) => (
  <Game banner={false} type={Phaser.HEADLESS}>
    {props.children}
  </Game>
)

// it appears there's a bug adding text objects in headless
// https://github.com/photonstorm/phaser/issues/4976
describe('Text', () => {
  it('renders text', async () => {
    // const ref = React.createRef<Phaser.GameObjects.Text>()
    // render(
    //   <Scene sceneKey="123">
    //     <Text
    //       ref={ref}
    //       x={100}
    //       y={100}
    //       text="Hello!"
    //       style={{
    //         color: 'white',
    //       }}
    //     />
    //   </Scene>,
    //   { wrapper }
    // )
    // await wait(() => {
    //   if (!ref.current) {
    //     throw {}
    //   }
    // })
    // console.log(ref)
  })
})
