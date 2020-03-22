/**
 * import node_modules
 */
import { combineReducers } from "redux"

/**
 * import others
 */
import checkToken, { actions as checkTokenActions } from "./checkToken"
import { InitialState as CheckTokenState } from "./checkToken/types"

/**
 * main
 */
export interface InitialState {
  checkToken: CheckTokenState
}

export const actions = {
  ...checkTokenActions,
}

export default combineReducers({
  checkToken,
})
