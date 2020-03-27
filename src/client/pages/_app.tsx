/**
 * import node_modules
 */
import "core-js/stable"
import "regenerator-runtime/runtime"
import App from "next/app"
import React, { Fragment } from "react"
import { Store, Dispatch } from "redux"
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
import { InitialState, actions } from "../store/modules"
import withRedux from "../store/with-redux-store"

/**
 * main
 */
const GlobalStyle = createGlobalStyle`
  ${reset}
  ${base}
  ${ant}
`

const {
  pages: {
    formTest: { resetField },
  },
} = actions

const resetStates = (resetActions: Function[], dispatch: Dispatch) => {
  resetActions.forEach((resetAction) => dispatch(resetAction()))
}

interface MyAppProps {
  reduxStore: Store<InitialState>
}

class MyApp extends App<MyAppProps> {
  render() {
    const { Component, pageProps, reduxStore } = this.props
    const { currentPage } = pageProps
    const { dispatch } = reduxStore

    resetStates([resetField], dispatch)

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
