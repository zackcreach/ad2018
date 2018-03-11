import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Post extends Component {
  state = {}
  static propTypes = {}
  static defaultProps = {}
  render() {
    const { data } = this.props
    return (
      <div>
        <h3>{data.contentfulBlogPost.createdAt}</h3>
        <h1>{data.contentfulBlogPost.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: data.contentfulBlogPost.body.childMarkdownRemark.html,
          }}
        />
      </div>
    )
  }
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      body {
        childMarkdownRemark {
          html
          excerpt
        }
      }
      createdAt
      slug
      id
    }
  }
`
