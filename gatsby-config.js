module.exports = {
  siteMetadata: {
    title: "Allexa D'Alessio",
  },
  // pathPrefix: '/ad2018',
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: '7i8oitrgc6hc',
        accessToken:
          'f888d650e449d8cfbce2ee6790a7f6db0690de95c9cb4a47c2408112765da396',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'img',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'img',
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        // excerpt_separator: `<!-- excerpt break here -->`
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
  ],
}
