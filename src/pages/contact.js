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
            <p className={left__question}>
              Have a question? Send me a message!<br /> For booking inquiries:
            </p>
            <h3 className={header}>Los Angeles</h3>
            <p className={agency}>
              Natural Models<br />
              <a href="mailto:amanda@naturalmodelsla.com?subject=Allexa%20D%27Alessio">
                amanda@naturalmodelsla.com
              </a>
            </p>
            <p className={agency}>
              The Osbrink Agency (Commercial)<br />
              <a href="mailto:Libby@osbrinkagency.com?subject=Allexa%20D%27Alessio">
                Libby@osbrinkagency.com
              </a>
            </p>
            <br />
            <h3 className={header}>New York</h3>
            <p className={agency}>
              Wilhelmina Models<br />
              <a href="mailto:Jaime.Goldberg@wilhelmina.com?subject=Allexa%20D%27Alessio">
                Jaime.Goldberg@wilhelmina.com
              </a>
            </p>
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
  margin: 25px auto 0 auto;
  padding: 0 25px 0 25px;
  max-width: calc(1000px + (25px * 2));

  @media (min-width: 650px) {
    padding: 35px 25px 0 25px;
  }
`
const content = css`
  margin: 25px auto 0 auto;
  padding: 0 25px 0 25px;
  max-width: calc(1000px + (25px * 2));
  display: flex;
  flex-wrap: wrap;
`
const header = css`
  background: black;
  color: white;
  margin-bottom: 15px;
  padding: 0 5px 2px 5px;
  font-weight: 200;
`
const agency = css`
  padding-bottom: 15px;

  a {
    font-weight: 300;
  }
`
const left = css`
  width: 100%;
  padding: 0 0 50px 0;

  @media (min-width: 600px) {
    width: 50%;
    padding: 0 20px 0 0;
  }
`
const left__question = css`
  margin: 0 0 30px 0;
  padding: 0;
`
const right = css`
  width: 100%;
  padding: 0 0 50px 0;

  @media (min-width: 600px) {
    width: 50%;
    padding: 0 0 50px 20px;
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
