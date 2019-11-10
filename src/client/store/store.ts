/**
 * import node_modules
 */
import { createStore, compose, applyMiddleware } from "redux"
import Fetchr from "fetchr"
import stepsMiddleware from "redux-effects-steps"
import fetchrMiddleware from "redux-effects-fetchr"

/**
 * import others
 */
import { FetchrConstructor } from "../../server/types/Fetchr"
import bffConfig from "../../server/configs"
import reducer, { InitialState } from "./modules"
import isServer from "../shared/utils/isServer"

/**
 * main
 */
declare global {
  interface Window {
    // eslint-disable-next-line no-undef
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const fetchr: FetchrConstructor = new Fetchr(bffConfig.fetchr.clientConfig)

export function initializeStore(initialState?: InitialState) {
  const composeEnhancers = (isServer && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
  const middleware = [stepsMiddleware, fetchrMiddleware(fetchr)].filter(value => value)
  const enhancer = composeEnhancers(applyMiddleware(...middleware))

  // TODO: resolve any warning
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return createStore<any, any, any, any>(reducer, initialState, enhancer)
}
