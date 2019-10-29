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
import base from "../../assets/styles/base"
import ant from "../../assets/styles/ant"

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${base}
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
