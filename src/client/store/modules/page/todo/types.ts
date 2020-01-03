/**
 * import node_modules
 */
import { Action } from "redux-actions"

/**
 * main
 */
export interface InitialState {
  master: {
    isLoading: boolean
  }
}

export interface HandleActions {
  handleGetTodoList: () => Action<void>
}
