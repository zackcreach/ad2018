import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/header'

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
    const pageName = () => {
      if (location.pathname !== '/') {
        const removeSlash = location.pathname
          .replace('-', ' ')
          .replace(/(.*\/|\/)/i, '')
        const capitalized = removeSlash.split('')[0].toUpperCase()
        const newName = [capitalized, ...removeSlash.split('').slice(1)].join(
          ''
        )
        return newName
      } else {
        return 'Home'
      }
    }
    return (
      <div>
        <Helmet>
          <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, minimum-scale=1, maximum-scale=1"
          />
          <meta name="title" content="Allexa D'Alessio" />
          <meta name="description" content="Allexa D'Alessio" />
          <meta property="og:title" content="Allexa D'Alessio" />
          <meta property="og:description" content="Allexa D'Alessio" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://allexadalessio.com" />
          <meta
            property="og:image"
            content="https://images.ctfassets.net/7i8oitrgc6hc/7awjpRTea4eoQ0ge6SeOUs/7aaa89e9bd9582efa90cd58648b58671/AD5A3659-Edit.jpg?w=1200&q=95"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Oswald:200,300,400,500,600,700|Roboto:300,400,500"
          />
        </Helmet>
        <Header data={data} location={location} />
        <div className={container}>
          <div className={container__background} />
          {children()}
        </div>
      </div>
    )
  }
}

const container = css`
  position: relative;
  margin: 0 auto 30px auto;
`
const container__background = css`
  position: absolute;
  height: 30px;
  width: 100%;
  left: 0;
  right: 0;
  top: -40px;
  background-image: radial-gradient(
    rgba(0, 0, 0, 0.03),
    transparent 70%,
    transparent
  );
`
export const query = graphql`
  query IndexLayoutQuery {
    navigation: allContentfulSitePage(
      sort: { fields: [order], order: ASC }
      filter: { active: { eq: true } }
    ) {
      edges {
        node {
          id
          name
          slug
          active
          order
          background
        }
      }
    }
    headerBackground: imageSharp(id: { regex: "/background-palm.jpeg/" }) {
      resize(width: 1500, quality: 95) {
        src
      }
    }
  }
`
