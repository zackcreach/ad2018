module.exports = {
  siteMetadata: {
    title: "Allexa D'Allesio",
  },
  // pathPrefix: '/ad2018',
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: 'q2sn17erf7r7',
        accessToken:
          'c4de5a46799798a9a3029cfb6ee426c1404bc5928314f33002e841d8461c1516',
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
