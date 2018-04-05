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
          <div className={column}>
            {this.props.data.allContentfulAboutQuestion.edges.map(
              ({ node }, index) => {
                if (index <= assetHalf)
                  return (
                    <div class={question}>
                      <h3>{node.question}</h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: node.answer.answer,
                        }}
                      />
                    </div>
                  )
              }
            )}
          </div>
          <div className={column}>
            {this.props.data.allContentfulAboutQuestion.edges.map(
              ({ node }, index) => {
                if (index > assetHalf)
                  return (
                    <div class={question}>
                      <h3>{node.question}</h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: node.answer.answer,
                        }}
                      />
                    </div>
                  )
              }
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
`
const question = css``
const content = css`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  @media (min-width: 650px) {
    flex-wrap: nowrap;
  }

  h3 {
    background-color: #293722;
    color: white;
    padding-left: 5px;
    padding-bottom: 2px;
    font-weight: 200;
  }
`
const column = css`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 650px) {
    width: 50%;

    &:nth-of-type(1) {
      margin: 0 20px 0 0;
    }

    &:nth-of-type(2) {
      margin: 0 0 0 20px;
    }
  }
`
const attribution = css`
  position: absolute;
  width: 100px;
  bottom: 10px;
  right: 10px;
`

export const query = graphql`
  query AboutPageQuery {
    contentfulSitePage(slug: { eq: "about" }) {
      id
      name
      slug
      background
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
