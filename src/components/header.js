import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import styled, { css } from 'react-emotion'
import logo from '../images/logo--black.png'

export default class Header extends Component {
  constructor() {
    super()

    this.state = {
      logoStatus: 'spicy',
    }
  }
  static propTypes = {}
  static defaultProps = {}
  componentDidUpdate(prevProps, prevState) {
    const { location } = this.props
    // if (location.pathname !== prevProps.location.pathname) {
    //   if (this.props.location.pathname === '/') {
    //     // Web animation API! (experimental)
    //     this.header.animate([{ height: '200px' }, { height: '400px' }], {
    //       duration: 300,
    //       fill: 'forwards',
    //       easing: 'cubic-bezier(0.86, 0, 0.07, 1)',
    //       iterations: 1,
    //     })
    //   } else {
    //     this.header.animate([{ height: '400px' }, { height: '200px' }], {
    //       duration: 300,
    //       fill: 'forwards',
    //       easing: 'cubic-bezier(0.86, 0, 0.07, 1)',
    //       iterations: 1,
    //     })
    //   }
    // }
  }
  toggleLogo = () => {
    if (this.state.logoStatus === 'spicy') {
      return this.setState({
        logoStatus: 'classy',
      })
    }
    if (this.state.logoStatus === 'classy') {
      return this.setState({
        logoStatus: 'spicy',
      })
    }
  }
  render() {
    console.log(this.state)
    const { data, location } = this.props
    return (
      <HeaderWrapper
        isHome={location.pathname === '/'}
        ref={node => (this.header = ReactDOM.findDOMNode(node))}
      >
        <Toggle logoStatus={this.state.logoStatus} onClick={this.toggleLogo}>
          {this.state.logoStatus}
        </Toggle>
        {this.state.logoStatus === 'classy' && (
          <div>
            <img
              src={logo}
              alt="Allexa D'Allesio Logo"
              className={header__logo}
            />
            <figure className={header__divider} />
          </div>
        )}
        {this.state.logoStatus === 'spicy' && (
          <div className={header__text}>Allexa D'Allesio</div>
        )}
        <nav className={navigation}>
          {data.navigation.edges.map(({ node }) => (
            <Link
              key={node.id}
              activeClassName={navigation__active}
              className={navigation__item}
              to={node.slug !== '/' ? `/${node.slug}` : node.slug}
              exact={node.slug === '/'}
            >
              {node.name}
              <Box background={node.background} />
            </Link>
          ))}
        </nav>
      </HeaderWrapper>
    )
  }
}

const HeaderWrapper = styled('div')`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  /* box-shadow: 0 1px 50px rgba(0, 0, 0, 0.03); */
  position: relative;
  /* height: ${({ isHome }) => (isHome ? '400px' : '200px')}; */
  z-index: 1;
  background-color: white;

`
const Toggle = styled('div')`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  display: none;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: ${({ logoStatus }) =>
    logoStatus === 'spicy' ? 'red' : 'navy'};
  height: 80px;
  width: 80px;
  cursor: pointer;
  user-select: none;
`
const header__logo = css`
  position: relative;
  max-width: 300px;
  margin: 30px auto -35px auto;
`

const header__text = css`
  font-family: var(--font-secondary);
  color: black;
  font-weight: 700;
  text-transform: uppercase;
  font-size: calc(100vw / 7.9);
  margin: 20px 0 20px 0;
  text-align: center;
  user-select: none;

  @media (min-width: 650px) {
    font-size: 5.35rem;
    margin: 20px 0 20px 0;
  }
`

const header__divider = css`
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 0, 0, 0.2),
    transparent
  );
  max-width: 500px;
  margin: 0 auto 55px auto;
`

const navigation = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 625px;
  margin: 0 auto 20px auto;
  padding: 0 18px 0 18px;

  @media (min-width: 650px) {
    padding: 0 0 0 0;
  }
`
const navigation__list = css``
const navigation__item = css`
  display: block;
  padding: 2px 5px 3px 6px;
  font-family: var(--font-secondary);
  font-weight: 200;
  font-size: 0.8rem;
  line-height: 1.4;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  text-decoration: none;
  position: relative;
  transition: color 0.5s ease-in-out;
  user-select: none;
  overflow: hidden;
  z-index: 1;

  @media (min-width: 500px) {
    font-size: 0.9rem;
    line-height: 1.5;
    padding: 0px 7px 1px 8px;
  }

  &:hover {
    color: white;

    div {
      max-width: 100%;
      transition: max-width 0.6s ease-out;
    }
  }
`
const Box = styled('div')`
  position: absolute;
  max-width: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  transition: max-width 0.4s ease-in;
  background: ${({ background }) => background || 'black'};
`
const navigation__active = css`
  color: white;

  & div {
    max-width: 100%;
  }
`
