import * as React from 'react'

const GameContext = React.createContext<Phaser.Game | null>(null)

export default GameContext
