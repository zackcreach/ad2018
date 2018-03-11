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
        <div
          dangerouslySetInnerHTML={{
            __html: data.markdownRemark.frontmatter.title,
          }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: data.markdownRemark.html,
          }}
        />
      </div>
    )
  }
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
