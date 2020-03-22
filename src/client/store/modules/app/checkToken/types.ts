/**
 * import node_modules
 */
import { Action } from "redux-actions"

/**
 * main
 */
export interface InitialState {
  isLoading: boolean
  errorMessage: string
}

export interface HandleActions {
  handleCheckToken: () => Action<void>
}
