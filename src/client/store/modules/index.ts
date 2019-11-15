import { combineReducers } from "redux"
import todo, { InitialState as TodoState, actions as todoActions } from "./page/todo"

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
