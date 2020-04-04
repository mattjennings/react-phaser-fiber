export default {
  title: 'react-phaser-fiber',
  menu: ['Home', 'Components'],
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
