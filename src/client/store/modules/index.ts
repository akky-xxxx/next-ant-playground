import { combineReducers } from "redux"
import todo, { InitialState as TodoState } from "./page/todo"

export interface InitialState {
  todo: TodoState
}

export default combineReducers({
  page: combineReducers({
    todo,
  }),
})
