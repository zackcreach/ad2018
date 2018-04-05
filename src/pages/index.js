import React, { Component } from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

import styled, { css } from 'react-emotion'

export default class Home extends Component {
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
        <div className={content}>
          {data.allContentfulAsset.edges.map(({ node }, index) => (
            <img key={index} className={image} src={node.sizes.src} />
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
  width: 100%;
`
const image = css`
  width: 100%;
`

export const query = graphql`
  query HomePageQuery {
    contentfulSitePage(slug: { eq: "/" }) {
      id
      name
      slug
      background
    }
    allContentfulAsset(
      filter: { title: { regex: "/home/" } }
      sort: { fields: [title], order: ASC }
    ) {
      edges {
        node {
          title
          sizes(quality: 90, maxWidth: 1000) {
            src
          }
        }
      }
    }
  }
`
