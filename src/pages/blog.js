import React, { Component } from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'

import { css } from 'react-emotion'

export default class Blog extends Component {
  state = {}
  static propTypes = {}
  static defaultProps = {}
  render() {
    const { data } = this.props
    return (
      <div className={blog}>
        {data.allContentfulBlogPost.edges.map(({ node }) => (
          <div key={node.id} className={blog__container}>
            <Link to={`/blog/${node.slug}`}>{node.title}</Link>
            <p>{node.date}</p>
            <p>{node.body.childMarkdownRemark.excerpt}</p>
          </div>
        ))}
      </div>
    )
  }
}

const blog = css``
const blog__container = css``

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
