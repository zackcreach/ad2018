import React, { Component } from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'

export default class Blog extends Component {
  state = {}
  static propTypes = {}
  static defaultProps = {}
  render() {
    const { data } = this.props
    return (
      <div>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
        ))}
      </div>
    )
  }
}

export const query = graphql`
  query allPosts {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD YYYY")
          }
          fields {
            slug
          }
          html
          excerpt(pruneLength: 280)
        }
      }
    }
  }
`
