import React, { Component } from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import styled, { css } from 'react-emotion'

export default class Contact extends Component {
  state = {
    name: '',
    email: '',
    emailValid: false,
    message: '',
    submitted: false,
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
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact-form', ...this.state }),
    })
      .then(() => {
        console.log('Message sent successfully!')
        return this.setState({
          submitted: true,
        })
      })
      .catch(error => alert(error))

    event.preventDefault()
  }
  render() {
    const { data } = this.props
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
            <p>Have a question? Send me a message!</p>
          </div>
          <div className={right}>
            {this.state.submitted ? (
              <div className={thanks}>
                <p>
                  <b>Thanks so much for your message!</b>
                  <br />
                  I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form
                name="contact-form"
                method="post"
                onSubmit={this.handleSubmit}
                data-netlify="true"
                data-netlify-honeypot="bot-field"
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
                <label className={hidden} htmlFor="bot-field">
                  Bots only
                </label>
                <input className={hidden} name="bot-field" type="text" />
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
const hidden = css`
  display: none;
  visibility: hidden;
`
const thanks = css`
  width: 100%;
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

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}
