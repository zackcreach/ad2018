import React, { Component } from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import styled, { css } from 'react-emotion'

export default class About extends Component {
  state = {}
  static propTypes = {}
  static defaultProps = {}
  render() {
    const { data } = this.props
    return (
      <div className={container}>
        <Helmet>
          <title>{`Allexa D'Allesio | ${data.contentfulSitePage.name}`}</title>
        </Helmet>
        <Title background={data.contentfulSitePage.background}>
          {data.contentfulSitePage.name}
        </Title>
        <div className={content}>
          <div className={attribution}>
            <a
              href="https://www.contentful.com/"
              rel="nofollow"
              target="_blank"
            >
              <img
                src="https://images.contentful.com/fo9twyrwpveg/44baP9Gtm8qE2Umm8CQwQk/c43325463d1cb5db2ef97fca0788ea55/PoweredByContentful_LightBackground.svg"
                alt="Powered by Contentful"
              />
            </a>
          </div>
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
  min-height: 50vh;
  width: 100%;
  background: yellow;
  position: relative;
`
const attribution = css`
  position: absolute;
  width: 100px;
  bottom: 10px;
  right: 10px;
`

export const query = graphql`
  query AboutPageQuery {
    contentfulSitePage(slug: { eq: "about" }) {
      id
      name
      slug
      background
    }
  }
`
