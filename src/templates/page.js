import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import styled, { css } from 'react-emotion'

export default class Page extends Component {
  state = {}
  static propTypes = {}
  static defaultProps = {}
  render() {
    const { data } = this.props
    return (
      <div>
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

const Title = styled('h1')`
  color: ${({ background }) => background || 'inherit'};
`
const content = css`
  height: 10px;
  width: 100%;
  background: red;
`

export const query = graphql`
  query PageQuery($slug: String!) {
    contentfulSitePage(slug: { eq: $slug }) {
      name
      slug
      active
      order
      background
    }
  }
`
