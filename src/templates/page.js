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
  margin: 35px auto 0 auto;
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
