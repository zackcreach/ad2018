import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/Header'

import { css } from 'react-emotion'
import '../styles/styles.scss'

export default class TemplateWrapper extends Component {
  state = {}
  static propTypes = {
    children: PropTypes.func,
    data: PropTypes.object,
    location: PropTypes.object,
  }
  render() {
    const { children, data, location } = this.props
    return (
      <div>
        <Helmet>
          <title>Allexa D'Allesio | </title>
          <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="description"
            content="Personal website of Allexa D'Allesio"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Oswald:200,300,400,500,600,700|Raleway:200,300,400,500,600"
          />
        </Helmet>
        <Header data={data} location={location} />
        <div className={container}>{children()}</div>
      </div>
    )
  }
}

const container = css`
  margin: 0 auto 0 auto;
`

export const query = graphql`
  query IndexLayoutQuery {
    logo: imageSharp(id: { regex: "/logo--black.png/" }) {
      sizes(maxWidth: 300) {
        ...GatsbyImageSharpSizes
      }
    }
    navigation: allContentfulNavigationItem {
      edges {
        node {
          id
          name
          link
          active
          order
        }
      }
    }
  }
`
