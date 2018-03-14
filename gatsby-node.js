const path = require('path')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allFile {
          edges {
            node {
              relativeDirectory
              name
            }
          }
        }
        allContentfulSitePage {
          edges {
            node {
              slug
            }
          }
        }
        allContentfulBlogPost {
          edges {
            node {
              slug
            }
          }
        }
      }
    `)
      .then(result => {
        // Let's start by building an array with all current pages
        // We've added '/' in contentful, so adding that in to start
        let currentPages = ['/']
        result.data.allFile.edges.filter(({ node }) => {
          if (node.relativeDirectory.includes('pages')) {
            return currentPages.push(node.name)
          }
        })
        console.log(currentPages)
        // Now let's create pages for anything that isn't our /pages
        // directory already using indexOf() to check if it's in the array
        result.data.allContentfulSitePage.edges.map(({ node }) => {
          if (currentPages.indexOf(node.slug) === -1) {
            console.log(`Creating new page ${node.slug}`)
            createPage({
              path: `${node.slug}`,
              component: path.resolve('./src/templates/page.js'),
              context: {
                slug: node.slug,
              },
            })
          }
        })
        result.data.allContentfulBlogPost.edges.map(({ node }) => {
          createPage({
            path: `/blog/${node.slug}`,
            component: path.resolve('./src/templates/post.js'),
            context: {
              slug: node.slug,
            },
          })
        })
      })
      .catch(error => console.error(error))
    resolve()
  })
}
