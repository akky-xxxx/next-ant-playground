import App from "next/app"
import React, { Fragment } from "react"
import { createGlobalStyle } from "styled-components"

import Layout from "../components/layouts/layout"

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0
  }
  
  .ant-select-dropdown-menu-item {
    white-space: normal;
  }
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

