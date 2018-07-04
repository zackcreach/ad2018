import React, { Component } from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

import styled, { css } from 'react-emotion'

export default class Portfolio extends Component {
  state = {}
  static propTypes = {}
  static defaultProps = {}
  render() {
    const { data } = this.props
    const assetNumber = data.allContentfulAsset.edges.length
    const assetHalf = Math.floor(assetNumber / 2)
    const imagesRandomized = data.allContentfulAsset.edges.sort(
      () => 0.5 - Math.random()
    )
    return (
      <div className={container}>
        <Helmet>
          <title>{`Allexa D'Alessio | ${data.contentfulSitePage.name}`}</title>
        </Helmet>
        <Title background={data.contentfulSitePage.background}>
          {data.contentfulSitePage.name}
        </Title>
        <div className={content}>
          <div className={column}>
            {imagesRandomized.map(({ node }, index) => {
              if (index <= assetHalf)
                return (
                  <img key={index} className={image} src={node.sizes.src} />
                )
            })}
          </div>
          <div className={column}>
            {imagesRandomized.map(({ node }, index) => {
              if (index > assetHalf)
                return (
                  <img key={index} className={image} src={node.sizes.src} />
                )
            })}
          </div>
        </div>
      </div>
    )
  }
}

const container = css``
const Title = styled('h1')`
  color: ${({ background }) => background || 'inherit'};
  margin: 25px auto 0 auto;
  padding: 0 25px 0 25px;
  max-width: calc(1000px + (25px * 2));

  @media (min-width: 650px) {
    padding: 35px 25px 0 25px;
  }
`
const content = css`
  width: 100%;
  margin: 25px auto 0 auto;
  padding: 0 25px 0 25px;
  max-width: calc(1000px + (25px * 2));
  display: flex;
  flex-wrap: wrap;

  @media (min-width: 650px) {
    flex-wrap: nowrap;
  }
`
const column = css`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 650px) {
    width: 50%;

    &:nth-of-type(1) {
      margin: 0 3px 0 0;
    }

    &:nth-of-type(2) {
      margin: 0 0 0 3px;
    }
  }
`
const image = css`
  width: 100%;
  margin: 0 0 6px 0;
`
export const query = graphql`
  query PortfolioPageQuery {
    contentfulSitePage(slug: { eq: "portfolio" }) {
      id
      name
      slug
      background
    }
    allContentfulAsset(sort: { fields: [title], order: ASC }) {
      edges {
        node {
          title
          sizes {
            src
          }
        }
      }
    }
  }
`
