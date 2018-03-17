import React, { Component } from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

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
          <title>{`Allexa D'Allesio | ${data.contentfulSitePage.name}`}</title>
        </Helmet>
        <Title background={data.contentfulSitePage.background}>
          {data.contentfulSitePage.name}
        </Title>
        <div className={content}>
          <p>Pictures perhaps? Same as current homepage.</p>
          <p>
            Knausgaard tbh disrupt cardigan lyft literally yr franzen kombucha.
            Tacos prism locavore man braid, fingerstache pickled salvia before
            they sold out hammock scenester. Knausgaard thundercats godard
            pour-over farm-to-table, plaid XOXO copper mug roof party. Butcher
            post-ironic XOXO, scenester air plant chambray jianbing adaptogen.
          </p>
          <p>
            Polaroid hot chicken umami pop-up drinking vinegar normcore hella
            cornhole. Jean shorts live-edge normcore before they sold out health
            goth, lumbersexual neutra selfies copper mug tattooed pitchfork
            crucifix. Copper mug banjo pop-up locavore selfies.
          </p>
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

export const query = graphql`
  query HomePageQuery {
    contentfulSitePage(slug: { eq: "/" }) {
      id
      name
      slug
      background
    }
  }
`
