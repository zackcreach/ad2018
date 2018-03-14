import React, { Component } from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import styled, { css } from 'react-emotion'

export default class Contact extends Component {
  state = {
    submitted: false,
    name: '',
    email: '',
    emailValid: false,
    message: '',
  }
  static propTypes = {}
  static defaultProps = {}
  handleChange = event => {
    const value = event.target.value
    const name = event.target.name

    if (name === 'email') {
      if (/(^\w.*@\w+\.\w)/.test(value)) {
        console.log('Valid email!')
        this.setState({
          emailValid: true,
        })
      } else {
        console.log('Keep going...')
        this.setState({
          emailValid: false,
        })
      }
    }

    this.setState({
      [name]: value,
    })
  }
  handleSubmit = event => {
    this.setState({
      submitted: true,
    })
  }
  render() {
    const { data } = this.props
    return (
      <div className={container}>
        <Helmet>
          <title>{`Allexa D'Allesio | ${data.contentfulSitePage.name}`}</title>
        </Helmet>
        <Title background={data.contentfulSitePage.background}>
          {data.contentfulSitePage.name}
        </Title>
        <div className={content}>
          <div className={left}>
            <p>Have a question? Send me a message!</p>
          </div>
          <div className={right}>
            {this.state.submitted ? (
              <p>Thanks for your message!</p>
            ) : (
              <form
                name="contact-form"
                action="/contact/#0"
                method="POST"
                data-netlify="true"
                onSubmit={this.handleSubmit}
              >
                <label htmlFor="name">Name</label>
                <input
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  type="text"
                  autoComplete="name"
                  required
                />
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  type="text"
                  autoComplete="email"
                  required
                />
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  value={this.state.message}
                  onChange={this.handleChange}
                  required
                />
                <button disabled={!this.state.emailValid} type="submit">
                  Send
                </button>
              </form>
            )}
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
  display: flex;
  flex-wrap: wrap;
`
const left = css`
  width: 100%;

  @media (min-width: 600px) {
    width: 50%;
  }
`
const right = css`
  width: 100%;
  padding: 0 0 50px 0;

  @media (min-width: 600px) {
    width: 50%;
  }
`
export const query = graphql`
  query ContactPageQuery {
    contentfulSitePage(slug: { eq: "contact" }) {
      id
      name
      slug
      background
    }
  }
`
