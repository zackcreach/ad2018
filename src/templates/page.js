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
          <title>{`Allexa D'Alessio | ${data.contentfulSitePage.name}`}</title>
        </Helmet>
        <Title background={data.contentfulSitePage.background}>
          {data.contentfulSitePage.name}
        </Title>
        <div className={content}>
          {data.contentfulSitePage.content ? (
            <div
              dangerouslySetInnerHTML={{ __html: contentfulSitePage.content }}
            />
          ) : (
            <p>Coming soon!</p>
          )}
        </div>
      </div>
    )
  }
}

const Title = styled('h1')`
  color: ${({ background }) => background || 'inherit'};
`
const content = css`
  width: 100%;
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
