import React, { Component } from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

import styled, { css } from 'react-emotion'

export default class Home extends Component {
  state = {}
  static propTypes = {}
  static defaultProps = {}
  componentDidMount() {
    this.renderInstagram()
  }
  renderInstagram = () => {
    console.log('Starting instagram..')

    const fetchData = url => {
      return fetch(url)
        .then(data => data.json())
        .then(json => {
          if (json) {
            return Promise.resolve(json)
          } else {
            return Promise.reject(Error('json is undefined!'))
          }
        })
    }
    const addPost = (container, src, href, caption) => {
      const link = document.createElement('a')
      link.classList.add('instagram__link')
      link.setAttribute('href', href)
      link.setAttribute('target', '_blank')

      const post = document.createElement('img')
      post.classList.add('instagram__image')
      post.setAttribute('src', src)
      post.setAttribute('alt', caption)

      link.appendChild(post)
      container.appendChild(link)
    }
    const createPosts = ({ data }) => {
      this.instagram.textContent = ''
      data.map((post, index) => {
        if (index <= 8) {
          addPost(
            this.instagram,
            post.images.thumbnail.url,
            post.link,
            post.caption.text
          )
        }
      })
    }

    const base = 'https://api.instagram.com/v1/users/self/media/recent/'
    const token = '20794287.cca1595.c9ab9ca969eb4b7b86c337a34f3ec327'

    fetchData(`${base}?access_token=${token}`)
      .then(data => createPosts(data))
      .catch(error => console.error(error))
  }
  render() {
    const { data } = this.props
    return (
      <div className={container}>
        <Helmet>
          <title>{`Allexa D'Alessio | ${data.contentfulSitePage.name}`}</title>
        </Helmet>
        <div className={content}>
          {data.allContentfulAsset.edges.map(({ node }, index) => (
            <img key={index} className={image} src={node.sizes.src} />
          ))}
        </div>
        <div className={social}>
          <div className={social__left}>
            <a
              className={social__title}
              href="https://twitter.com/AllexaDAlessio"
              target="_blank"
            >
              Twitter
            </a>
            <div className={social__container}>
              <a
                className="twitter-timeline"
                data-link-color="#333"
                data-height="480"
                target="_blank"
                href="https://twitter.com/AllexaDAlessio?ref_src=twsrc%5Etfw"
              />
            </div>
          </div>
          <div className={social__right}>
            <a
              className={social__title}
              href="https://www.instagram.com/allexadalessio/"
              target="_blank"
            >
              Instagram
            </a>
            <div
              className={instagram__container}
              ref={node => (this.instagram = node)}
            >
              <a
                href="https://www.instagram.com/allexadalessio/"
                target="_blank"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const container = css``
const Title = styled('h1')`
  color: ${({ background }) => background || 'inherit'};
`
const content = css`
  width: 100%;
`
const image = css`
  width: 100%;
`
const social = css`
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
`
const social__left = css`
  text-align: center;
  flex: 1 1 100%;
  padding: 40px 0 20px 0;

  @media (min-width: 750px) {
    flex: 1 1 50%;
    padding: 40px 20px 40px 0;
  }
`
const social__right = css`
  text-align: center;
  flex: 1 1 100%;
  height: 100%;
  padding: 0 0 40px 0;

  @media (min-width: 750px) {
    flex: 1 1 50%;
    padding: 40px 0 40px 10px;
    padding-left: 20px;
  }
`
const social__title = css`
  font-family: var(--font-secondary);
  text-transform: uppercase;
  color: #333;
  display: block;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0 0 25px 0;
`
const social__container = css`
  /* border: 1px solid #ccc; */
`
const instagram__container = css`
  /* border: 1px solid #ccc; */
  display: flex;
  flex-wrap: wrap;
`

export const query = graphql`
  query HomePageQuery {
    contentfulSitePage(slug: { eq: "/" }) {
      id
      name
      slug
      background
    }
    allContentfulAsset(
      limit: 1
      filter: { title: { regex: "/home/" } }
      sort: { fields: [title], order: ASC }
    ) {
      edges {
        node {
          title
          sizes(quality: 95, maxWidth: 1200) {
            src
          }
        }
      }
    }
  }
`
