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
        {data.allContentfulBlogPost.edges.map(({ node }) => (
          <div>
            <Link to={node.slug}>{node.title}</Link>
            <p>{node.date}</p>
            <p>{node.body.childMarkdownRemark.excerpt}</p>
          </div>
        ))}
      </div>
    )
  }
}

export const query = graphql`
  query allPosts {
    allContentfulBlogPost {
      edges {
        node {
          id
          title
          body {
            childMarkdownRemark {
              excerpt
            }
          }
          createdAt
          slug
          id
        }
      }
    }
  }
`
