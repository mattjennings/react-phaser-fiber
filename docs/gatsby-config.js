module.exports = {
  plugins: [
    'gatsby-theme-docz',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tsconfig-paths`,
    'gatsby-plugin-dark-mode',
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Fira Mono'],
        },
      },
    },
  ],
}
