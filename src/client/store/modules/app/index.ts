/**
 * import node_modules
 */
import { combineReducers } from "redux"
import { steps } from "redux-effects-steps"
import { fetchrCreate } from "redux-effects-fetchr"

/**
 * import others
 */
import checkTokenModule from "./checkToken"
import { InitialState as CheckTokenState } from "./checkToken/types"

/**
 * main
 */
const { actions: checkTokenActions, reducer: checkToken } = checkTokenModule
const { request, success, fail } = checkTokenActions

const checkTokenAction = () => {
  return steps(request(), fetchrCreate("checkToken"), [success, fail])
}

export interface InitialState {
  checkToken: CheckTokenState
}

export const actions = {
  checkToken: checkTokenAction,
}

export default combineReducers({
  checkToken,
})
