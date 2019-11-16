import { combineReducers } from "redux"
import { InitialState as TodoState } from "./page/todo/types"
import todo, { actions as todoActions } from "./page/todo"

export const actions = {
  pages: {
    todo: todoActions,
  },
}

export interface InitialState {
  pages: {
    todo: TodoState
  }
}

export default combineReducers({
  pages: combineReducers({
    todo,
  }),
})
