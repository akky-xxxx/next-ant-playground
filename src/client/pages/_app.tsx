/**
 * import node_modules
 */
import App from "next/app"
import React, { Fragment } from "react"
import { createGlobalStyle } from "styled-components"

/**
 * import components
 */
import Layout from "../components/layouts/layout"

/**
 * import others
 */
import reset from "../../assets/styles/reset"
import ant from "../../assets/styles/ant"

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${ant}
`

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <Fragment>
        <GlobalStyle />
        <Layout>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </Layout>
      </Fragment>
    )
  }
}

export default MyApp

