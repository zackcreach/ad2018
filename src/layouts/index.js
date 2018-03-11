import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import './index.css'

const TemplateWrapper = ({ children, data, location }) => (
  <div>
    <Helmet
      title="Allexa D'Alessio"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header data={data} location={location} />
    <div>{children()}</div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

export const query = graphql`
  query LogoQuery {
    logo: imageSharp(id: { regex: "/logo--black.png/" }) {
      sizes(maxWidth: 300) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`
