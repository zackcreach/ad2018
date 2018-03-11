import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styled, { css } from 'react-emotion'

export default class Page extends Component {
  state = {}
  static propTypes = {}
  static defaultProps = {}
  render() {
    const { data } = this.props
    return (
      <div>
        <Title background={data.contentfulNavigationItem.background}>
          {data.contentfulNavigationItem.name}
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
    contentfulNavigationItem(slug: { eq: $slug }) {
      name
      slug
      active
      order
      background
    }
  }
`
