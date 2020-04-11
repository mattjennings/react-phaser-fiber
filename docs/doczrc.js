export default {
  title: 'react-phaser-fiber',
  menu: ['Getting Started', 'Components'],
  initialColorMode: 'dark',
  typescript: true,
  docgenConfig: {
    searchPath: '../packages/react-phaser-fiber/src',
  },
  filterComponents: (files) => {
    return files.filter((filepath) =>
      /\/[A-Z]\w*\.(js|jsx|ts|tsx)$/.test(filepath)
    )
  },
}
