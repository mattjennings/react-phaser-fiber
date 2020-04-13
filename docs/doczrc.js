export default {
  title: 'react-phaser-fiber',
  menu: [
    'Getting Started',
    {
      name: 'Components',
      menu: ['Game Objects'],
    },
  ],
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
