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
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="description"
            content="Personal website of Allexa D'Alessio"
          />
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
