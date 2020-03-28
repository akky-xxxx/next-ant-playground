/**
 * import node_modules
 */
import { configureStore } from "@reduxjs/toolkit"
import Fetchr from "fetchr"
import stepsMiddleware from "redux-effects-steps"
import fetchrMiddleware from "redux-effects-fetchr"

/**
 * import others
 */
import bffConfig from "../../server/configs"
import reducer from "./modules"

/**
 * main
 */
const fetchr = new Fetchr(bffConfig.fetchr.clientConfig)
const middleware = [stepsMiddleware, fetchrMiddleware(fetchr)].filter((value) => value)

const initializeStore = () => {
  return configureStore({
    reducer,
    middleware,
  })
}

const store = initializeStore()

export default store
