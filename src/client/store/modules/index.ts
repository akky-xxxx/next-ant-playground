import { combineReducers } from "redux"

import { InitialState as FormTestState } from "./page/formTest/types"
import formTest, { actions as formTestActions } from "./page/formTest"
import { InitialState as ToDoState } from "./page/todo/types"
import todo, { actions as todoActions } from "./page/todo"

export const actions = {
  pages: {
    formTest: formTestActions,
    todo: todoActions,
  },
}

export interface InitialState {
  pages: {
    formTest: FormTestState
    todo: ToDoState
  }
}

export default combineReducers({
  pages: combineReducers({
    formTest,
    todo,
  }),
})
