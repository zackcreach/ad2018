import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import styled, { css } from 'react-emotion'
import logo from '../../images/logo--black.png'

export default class Header extends Component {
  state = {}
  static propTypes = {}
  static defaultProps = {}
  componentDidUpdate(prevProps, prevState) {
    const { location } = this.props
    if (location.pathname !== prevProps.location.pathname) {
      if (this.props.location.pathname === '/') {
        // Web animation API! (experimental)
        this.header.animate([{ height: '200px' }, { height: '400px' }], {
          duration: 300,
          fill: 'forwards',
          easing: 'cubic-bezier(0.86, 0, 0.07, 1)',
          iterations: 1,
        })
      } else {
        this.header.animate([{ height: '400px' }, { height: '200px' }], {
          duration: 300,
          fill: 'forwards',
          easing: 'cubic-bezier(0.86, 0, 0.07, 1)',
          iterations: 1,
        })
      }
    }
  }
  render() {
    const { data, location } = this.props
    return (
      <HeaderWrapper
        isHome={location.pathname === '/'}
        ref={node => (this.header = ReactDOM.findDOMNode(node))}
      >
        <img src={logo} alt="Allexa D'Allesio Logo" className={header__logo} />
        {/* <Img
          sizes={data.logo.sizes}
          alt="Allexa D'Allesio Logo"
          outerWrapperClassName={header__logo}
        /> */}
        <nav className={navigation}>
          <Link className={navigation__item} to="/">
            Home
          </Link>
          <Link className={navigation__item} to="/portfolio">
            Portfolio
          </Link>
          <Link className={navigation__item} to="/resume">
            Resume
          </Link>
          <Link className={navigation__item} to="/about">
            About
          </Link>
          <Link className={navigation__item} to="/contact">
            Contact
          </Link>
          <Link className={navigation__item} to="/blog">
            Blog
          </Link>
        </nav>
      </HeaderWrapper>
    )
  }
}

const HeaderWrapper = styled('div')`
  background-color: red;
  height: ${({ isHome }) => (isHome ? '400px' : '200px')};
`
const header__logo = css`
  position: relative;
  max-width: 200px;
`
const navigation = css`
  background-color: yellow;
`
const navigation__list = css`
  background-color: purple;
`
const navigation__item = css`
  background-color: primrose;
`
