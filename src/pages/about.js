import React, { Component } from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import styled, { css } from 'react-emotion'

export default class About extends Component {
  state = {}
  static propTypes = {}
  static defaultProps = {}
  render() {
    const { data } = this.props
    const assetNumber = data.allContentfulAboutQuestion.edges.length
    const assetHalf = Math.floor(assetNumber / 2)
    return (
      <div className={container}>
        <Helmet>
          <title>{`Allexa D'Alessio | ${data.contentfulSitePage.name}`}</title>
        </Helmet>
        <Title background={data.contentfulSitePage.background}>
          {data.contentfulSitePage.name}
        </Title>
        <div className={content}>
          <div className={left}>
            {data.allContentfulAsset.edges.map(({ node }, index) => (
              <img key={index} className={image} src={node.sizes.src} />
            ))}
          </div>
          <div className={right}>
            {this.props.data.allContentfulAboutQuestion.edges.map(
              ({ node }, index) => (
                <div className={question__container} key={index}>
                  <Question background={data.contentfulSitePage.background}>
                    {node.question}
                  </Question>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.answer.answer,
                    }}
                  />
                </div>
              )
            )}
          </div>
          <div className={attribution}>
            <a
              href="https://www.contentful.com/"
              rel="nofollow"
              target="_blank"
            >
              <img
                src="https://images.contentful.com/fo9twyrwpveg/44baP9Gtm8qE2Umm8CQwQk/c43325463d1cb5db2ef97fca0788ea55/PoweredByContentful_LightBackground.svg"
                alt="Powered by Contentful"
              />
            </a>
          </div>
        </div>
      </div>
    )
  }
}

const container = css``
const Title = styled('h1')`
  color: ${({ background }) => background || 'inherit'};
  margin: 25px auto 0 auto;
  padding: 0 25px 0 25px;
  max-width: calc(1000px + (25px * 2));

  @media (min-width: 650px) {
    padding: 35px 25px 0 25px;
  }
`
const Question = styled('h3')`
  background-color: ${({ background }) => background || '#222'};
  color: white;
  margin-bottom: 15px;
  padding: 0 5px 2px 5px;
  font-weight: 200;
`
const question__container = css`
  &:last-of-type {
    padding-bottom: 60px;
  }
`
const content = css`
  width: 100%;
  margin: 25px auto 0 auto;
  padding: 0 25px 0 25px;
  max-width: calc(1000px + (25px * 2));
  display: flex;
  flex-wrap: wrap;

  @media (min-width: 650px) {
    flex-wrap: nowrap;
  }
`
const left = css`
  width: 100%;

  @media (min-width: 650px) {
    width: 64%;
    margin: 0 20px 0 0;
  }
`
const right = css`
  width: 100%;

  @media (min-width: 650px) {
    width: 36%;
    margin: 0 0 0 20px;
  }
`
const image = css`
  width: 100%;
  vertical-align: top;

  &:nth-of-type(1) {
    padding: 0 0 30px 0;
    max-height: 350px;
    object-fit: cover;
    object-position: 50% 0;
  }
  &:nth-of-type(n + 2) {
    display: none;
  }

  @media (min-width: 650px) {
    &:nth-of-type(1) {
      max-height: 100%;
      padding: 0;
    }
    &:nth-of-type(n + 1) {
      display: block;
    }
  }
`
const attribution = css`
  position: absolute;
  width: 100px;
  bottom: 0;
  right: 30px;
`

export const query = graphql`
  query AboutPageQuery {
    contentfulSitePage(slug: { eq: "about" }) {
      id
      name
      slug
      background
    }
    allContentfulAsset(
      limit: 3
      filter: { title: { regex: "/about/" } }
      sort: { fields: [title], order: ASC }
    ) {
      edges {
        node {
          title
          sizes(quality: 95, maxWidth: 800) {
            src
          }
        }
      }
    }
    allContentfulAboutQuestion(sort: { fields: [createdAt], order: ASC }) {
      edges {
        node {
          createdAt
          question
          answer {
            answer
          }
        }
      }
    }
  }
`
