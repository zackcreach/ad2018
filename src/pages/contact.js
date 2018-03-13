import React, { Component } from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import styled, { css } from 'react-emotion'

export default class Contact extends Component {
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
        <div className={content} />
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
  background: yellow;
`

export const query = graphql`
  query ContactPageQuery {
    contentfulSitePage(slug: { eq: "contact" }) {
      id
      name
      slug
      background
    }
  }
`