import React, { Component } from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { css } from 'react-emotion'

export default class Portfolio extends Component {
  state = {}
  static propTypes = {}
  static defaultProps = {}
  render() {
    return (
      <div className={container}>
        <Helmet>
          <title>{`Allexa D'Allesio | Portfolio`}</title>
        </Helmet>
        <h1 className={title} />
        <div className={content} />
      </div>
    )
  }
}

const container = css``
const title = css``
const content = css``

export const query = graphql`
  query PortfolioLayoutQuery {
    portfolio: contentfulNavigationItem(slug: { eq: "portfolio" }) {
      id
      name
      slug
      background
    }
  }
`
