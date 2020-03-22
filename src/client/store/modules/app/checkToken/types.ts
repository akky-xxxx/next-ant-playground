/**
 * import node_modules
 */
import { Action } from "redux-actions"

/**
 * main
 */
export interface InitialState {
  isLoading: boolean
}

export interface HandleActions {
  handleCheckToken: () => Action<void>
}
