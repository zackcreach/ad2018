import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import styled, { css } from 'react-emotion'
import logo from '../images/logo--black.png'
import background from '../images/background-palm.jpeg'

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
  render() {
    const { data, location } = this.props
    return (
      <HeaderWrapper
        isHome={location.pathname === '/'}
        ref={node => (this.header = ReactDOM.findDOMNode(node))}
      >
        <div className={header__container}>
          <Background src={data.headerBackground.resize.src} />
          <div className={header__text}>Allexa D'Allesio</div>
        </div>
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
  width: 100%;
  /* box-shadow: 0 1px 50px rgba(0, 0, 0, 0.03); */
  position: relative;
  /* height: ${({ isHome }) => (isHome ? '400px' : '200px')}; */
  z-index: 1;
  background-color: white;

`
const header__container = css`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`
const Background = styled('div')`
  position: absolute;
  top: 5px;
  right: 5px;
  bottom: 5px;
  left: 5px;
  background-image: url(${({ src }) => src});
  background-size: 100%;
  background-position: 50% 20%;
  background-repeat: repeat;
  /* width: 100%; */
  /* height: 100%; */

  @media (min-width: 650px) {
    background-attachment: fixed;
  }
`
const header__text = css`
  font-family: var(--font-secondary);
  color: black;
  background: white;
  mix-blend-mode: screen;
  font-weight: 700;
  width: 100%;
  height: 100%;
  text-transform: uppercase;
  font-size: calc(100vw / 7.9);
  padding: 16px 0 20px 0;
  text-align: center;
  user-select: none;
  z-index: 1;

  @media (min-width: 650px) {
    font-size: 5.35rem;
    padding: 16px 0 20px 0;
  }
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
