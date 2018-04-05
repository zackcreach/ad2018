import React, { Component } from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import styled, { css } from 'react-emotion'

export default class Blog extends Component {
  state = {}
  static propTypes = {}
  static defaultProps = {}
  render() {
    const { data } = this.props
    return (
      <div className={container}>
        <Helmet>
          <title>{`Allexa D'Alessio | ${data.contentfulSitePage.name}`}</title>
        </Helmet>
        <Title background={data.contentfulSitePage.background}>
          {data.contentfulSitePage.name}
        </Title>
        <div className={content}>
          {data.allContentfulBlogPost.edges.map(({ node }) => (
            <div className={entry} key={node.id}>
              <Link to={`/blog/${node.slug}`}>{node.title}</Link>{' '}
              <span className={date}>{node.createdAt}</span>
              <p className={excerpt}>{node.body.childMarkdownRemark.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const container = css``
const Title = styled('h1')`
  color: ${({ background }) => background || 'inherit'};
`
const content = css`
  height: 10px;
  width: 100%;
`
const entry = css`
  padding: 0 0 40px 0;
  font-weight: 300;

  & * {
    font-size: 1rem;
    line-height: 28px;

    @media (min-width: 850px) {
      font-size: 1.3rem;
      line-height: 38px;
    }
  }
`
const date = css`
  color: #ccc;
  padding: 0 0 0 8px;
`
const excerpt = css`
  padding: 10px 0 0 0;
`
export const query = graphql`
  query BlogPageQuery {
    contentfulSitePage(slug: { eq: "blog" }) {
      id
      name
      slug
      background
    }
    allContentfulBlogPost(sort: { fields: [createdAt], order: DESC }) {
      edges {
        node {
          id
          slug
          createdAt(formatString: "MMMM DD, YYYY")
          updatedAt(formatString: "MMMM DD, YYYY")
          title
          tags
          body {
            childMarkdownRemark {
              excerpt(pruneLength: 140)
            }
          }
        }
      }
    }
  }
`
