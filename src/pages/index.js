import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { css } from 'react-emotion'

export default class CHANGE extends Component {
  state = {}
  static propTypes = {}
  static defaultProps = {}
  render() {
    return (
      <div className={container}>
        <Helmet>
          <title>{`Allexa D'Allesio`}</title>
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
