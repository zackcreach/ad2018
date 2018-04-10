import React, { Component } from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import styled, { css } from 'react-emotion'

export default class Resume extends Component {
  state = {}
  static propTypes = {}
  static defaultProps = {}
  render() {
    const {
      contentfulSitePage,
      resume,
      agencies,
      film,
      newMedia,
      commercial,
      theater,
      training,
      skills,
    } = this.props.data
    return (
      <div className={container}>
        <Helmet>
          <title>{`Allexa D'Alessio | ${contentfulSitePage.name}`}</title>
        </Helmet>
        <Title background={contentfulSitePage.background}>
          {contentfulSitePage.name}
        </Title>
        <div className={content}>
          {/* {resume.edges.map(({ node }, index) => (
            <div className={row} key={index}>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.description.childMarkdownRemark.html,
                }}
              />
              <p dangerouslySetInnerHTML={{ __html: node.role }} />
              <p dangerouslySetInnerHTML={{ __html: node.credit }} />
            </div>
          ))} */}

          <div className={agency__container}>
            {agencies.edges.map(({ node }, index) => (
              <div className={agency} key={index}>
                <div dangerouslySetInnerHTML={{ __html: node.name }} />
                <div
                  dangerouslySetInnerHTML={{
                    __html: node.details.childMarkdownRemark.html,
                  }}
                />
              </div>
            ))}
          </div>

          <h2 className={heading}>Film</h2>
          {film.edges.map(({ node }, index) => (
            <div className={row} key={index}>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.description.childMarkdownRemark.html,
                }}
              />
              <p dangerouslySetInnerHTML={{ __html: node.role }} />
              <p dangerouslySetInnerHTML={{ __html: node.credit }} />
            </div>
          ))}

          <h2 className={heading}>New Media</h2>
          {newMedia.edges.map(({ node }, index) => (
            <div className={row} key={index}>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.description.childMarkdownRemark.html,
                }}
              />
              <p dangerouslySetInnerHTML={{ __html: node.role }} />
              <p dangerouslySetInnerHTML={{ __html: node.credit }} />
            </div>
          ))}

          <h2 className={heading}>Commercial</h2>
          {commercial.edges.map(({ node }, index) => (
            <div className={row} key={index}>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.description.childMarkdownRemark.html,
                }}
              />
              <p dangerouslySetInnerHTML={{ __html: node.role }} />
              <p dangerouslySetInnerHTML={{ __html: node.credit }} />
            </div>
          ))}

          <h2 className={heading}>Theater</h2>
          {theater.edges.map(({ node }, index) => (
            <div className={row} key={index}>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.description.childMarkdownRemark.html,
                }}
              />
              <p dangerouslySetInnerHTML={{ __html: node.role }} />
              <p dangerouslySetInnerHTML={{ __html: node.credit }} />
            </div>
          ))}

          <h2 className={heading}>Training</h2>
          {training.edges.map(({ node }, index) => (
            <div className={row} key={index}>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.description.childMarkdownRemark.html,
                }}
                className={wrap}
              />
            </div>
          ))}

          <h2 className={heading}>Skills</h2>
          {skills.edges.map(({ node }, index) => (
            <div className={row} key={index}>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.description.childMarkdownRemark.html,
                }}
                className={wrap}
              />
            </div>
          ))}
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
  padding: 0 0 45px 0;
`
const heading = css`
  padding: 45px 0 0 0;
`
const agency__container = css`
  display: flex;
  justify-content: space-between;
`
const agency = css`
  /* flex: 1 1 33%; */
  padding: 0 10px;

  &:first-of-type {
    padding: 0 10px 0 0;
  }

  &:last-of-type {
    padding: 0 0 0 10px;
  }

  &, p {
    font-size: 0.6rem;
    line-height: 1.5;

    @media (min-width: 600px) {
      font-size: 1rem;
      line-height: 2;
    }
`
const divider = css`
  border-right: 1px solid #333;
  width: 1px;
  height: 100px;
`
const row = css`
  display: flex;
  justify-content: space-between;

  p {
    font-size: 0.6rem;
    line-height: 1.5;
    font-weight: 300;

    @media (min-width: 600px) {
      font-size: 1rem;
      line-height: 2;
    }

    &:nth-of-type(odd) {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

  & p:nth-of-type(1) {
    flex: 1 0 46%;
    text-align: left;
    padding: 0 10px 0 0;
  }

  & p:nth-of-type(2) {
    flex: 0 1 12%;
    text-align: left;
    padding: 0 10px;
  }

  & p:nth-of-type(3) {
    flex: 0 1 42%;
    text-align: right;
    padding: 0 0 0 10px;
  }
`

const wrap = css`
  flex: 1 1 auto !important;
  padding: 0 0 15px 0 !important;
`

export const query = graphql`
  query ResumesQuery {
    contentfulSitePage(slug: { eq: "resume" }) {
      id
      name
      slug
      background
    }
    agencies: allContentfulResumeAgency(
      sort: { fields: [createdAt], order: DESC }
    ) {
      edges {
        node {
          name
          details {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    resume: allContentfulResumeItem(
      filter: { type: { eq: "Resume" } }
      sort: { fields: [createdAt], order: DESC }
    ) {
      edges {
        node {
          type
          description {
            childMarkdownRemark {
              html
            }
          }
          role
          credit
        }
      }
    }
    film: allContentfulResumeItem(
      filter: { type: { eq: "Film" } }
      sort: { fields: [createdAt], order: DESC }
    ) {
      edges {
        node {
          type
          description {
            childMarkdownRemark {
              html
            }
          }
          role
          credit
        }
      }
    }
    newMedia: allContentfulResumeItem(
      filter: { type: { eq: "New Media" } }
      sort: { fields: [createdAt], order: DESC }
    ) {
      edges {
        node {
          type
          description {
            childMarkdownRemark {
              html
            }
          }
          role
          credit
        }
      }
    }
    commercial: allContentfulResumeItem(
      filter: { type: { eq: "Commercial" } }
      sort: { fields: [createdAt], order: DESC }
    ) {
      edges {
        node {
          type
          description {
            childMarkdownRemark {
              html
            }
          }
          role
          credit
        }
      }
    }
    theater: allContentfulResumeItem(
      filter: { type: { eq: "Theater" } }
      sort: { fields: [createdAt], order: DESC }
    ) {
      edges {
        node {
          type
          description {
            childMarkdownRemark {
              html
            }
          }
          role
          credit
        }
      }
    }
    training: allContentfulResumeItem(
      filter: { type: { eq: "Training" } }
      sort: { fields: [createdAt], order: DESC }
    ) {
      edges {
        node {
          type
          description {
            childMarkdownRemark {
              html
            }
          }
          role
          credit
        }
      }
    }
    skills: allContentfulResumeItem(
      filter: { type: { eq: "Skills" } }
      sort: { fields: [createdAt], order: DESC }
    ) {
      edges {
        node {
          type
          description {
            childMarkdownRemark {
              html
            }
          }
          role
          credit
        }
      }
    }
  }
`
