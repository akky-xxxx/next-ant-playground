/**
 * import node_modules
 */
import React from "react"
import { NextPageContext } from "next"
import { clone } from "remeda"

/**
 * import others
 */
import { initializeStore } from "./store"
import { InitialState } from "./modules"

/**
 * main
 */
interface AppWithReduxProps {
  initialReduxState: InitialState
}

const isServer = typeof window === "undefined"

function getOrCreateStore(initialState?: InitialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState)
  }

  // Create store if unavailable on the client and set it on the window object
  // eslint-disable-next-line no-underscore-dangle
  if (!window.__NEXT_REDUX_STORE__) {
    // eslint-disable-next-line no-underscore-dangle
    window.__NEXT_REDUX_STORE__ = initializeStore(initialState)
  }
  // eslint-disable-next-line no-underscore-dangle
  return window.__NEXT_REDUX_STORE__
}

// TODO: resolve any warning
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (App: any) => {
  return class AppWithRedux extends React.Component {
    reduxStore: InitialState

    static async getInitialProps(appContext: NextPageContext) {
      const newAppContext = clone(appContext)
      const reduxStore = getOrCreateStore()

      // Provide the store to getInitialProps of pages
      newAppContext.ctx.reduxStore = reduxStore

      let appProps = {}
      if (typeof App.getInitialProps === "function") {
        appProps = await App.getInitialProps(newAppContext)
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
      }
    }

    constructor(props: AppWithReduxProps) {
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }

    render() {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <App {...this.props} reduxStore={this.reduxStore} />
    }
  }
}
