import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { css } from 'react-emotion'

export default class Post extends Component {
  state = {}
  static propTypes = {}
  static defaultProps = {}
  render() {
    const { data } = this.props
    return (
      <div>
        <Helmet>
          <title>{`Allexa D'Allesio | ${data.contentfulBlogPost.title}`}</title>
        </Helmet>
        <h1 className={title}>{data.contentfulBlogPost.title}</h1>
        <div className={details}>
          <h3 className={date}>{data.contentfulBlogPost.updatedAt}</h3>
          {data.contentfulBlogPost.tags !== null &&
            data.contentfulBlogPost.tags.map((node, index) => {
              if (index <= 5) {
                return (
                  <a className={tag} key={index}>
                    {node}
                  </a>
                )
              }
            })}
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: data.contentfulBlogPost.body.childMarkdownRemark.html,
          }}
        />
      </div>
    )
  }
}

const title = css`
  padding: 0 0 5px 0;
`
const details = css`
  padding: 0 0 30px 0;
  display: flex;
  align-items: center;
`
const date = css`
  padding: 0 0 0 0;
  font-size: 0.9rem;
  font-weight: 300;
  color: #999;
`
const tag = css`
  font-family: var(--font-secondary);
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: 300;
  color: white;
  background-color: #999;
  margin: 0 8px 0 0;
  padding: 2px 3px;
  line-height: 1;
  transition: var(--transition-ease);

  &:hover {
    color: white;
    background-color: #444;
    cursor: pointer;
  }

  &:first-of-type {
    margin-left: 10px;
  }
`

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      id
      slug
      createdAt(formatString: "MMMM DD, YYYY")
      updatedAt(formatString: "MMMM DD, YYYY")
      title
      tags
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
