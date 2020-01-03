import { combineReducers } from "redux"
import { InitialState as TodoState } from "./page/formTest/types"
import todo, { actions as todoActions } from "./page/formTest"

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
