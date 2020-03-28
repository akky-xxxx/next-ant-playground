/**
 * import node_modules
 */
import "core-js/stable"
import "regenerator-runtime/runtime"
import { AppProps } from "next/app"
import React, { Fragment } from "react"
import { Dispatch } from "redux"
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
import { actions } from "../store/modules"
import store from "../store/store"

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
    formTest: { fieldReset },
  },
} = actions

const resetStates = (resetActions: Function[], dispatch: Dispatch) => {
  resetActions.forEach((resetAction) => dispatch(resetAction()))
}

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props
  const { currentPage } = pageProps

  resetStates([fieldReset], store.dispatch)

  return (
    <Fragment>
      <GlobalStyle />
      <Layout currentPage={currentPage}>
        <Provider store={store}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </Provider>
      </Layout>
    </Fragment>
  )
}

export default MyApp
