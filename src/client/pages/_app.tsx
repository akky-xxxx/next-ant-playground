/**
 * import node_modules
 */
import App from "next/app"
import React, { Fragment } from "react"
import { Store } from "redux"
import { createGlobalStyle } from "styled-components"
import { Provider } from "react-redux"

/**
 * import components
 */
import Layout from "../components/layouts/layout"

/**
 * import others
 */
import reset from "../assets/styles/reset"
import base from "../assets/styles/base"
import ant from "../assets/styles/ant"
import { InitialState } from "../store/modules"
import withRedux from "../store/with-redux-store"

/**
 * main
 */
const GlobalStyle = createGlobalStyle`
  ${reset}
  ${base}
  ${ant}
`

interface MyAppProps {
  reduxStore: Store<InitialState>
}

class MyApp extends App<MyAppProps> {
  render() {
    const { Component, pageProps, reduxStore } = this.props
    const { currentPage } = pageProps

    return (
      <Fragment>
        <GlobalStyle />
        <Layout currentPage={currentPage}>
          <Provider store={reduxStore}>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
          </Provider>
        </Layout>
      </Fragment>
    )
  }
}

export default withRedux(MyApp)
