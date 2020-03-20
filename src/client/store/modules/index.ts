import { combineReducers } from "redux"

import { InitialState as CheckTokenState } from "./app/checkToken/types"
import checkToken, { actions as checkTokenActions } from "./app/checkToken"
import { InitialState as FormTestState } from "./page/formTest/types"
import formTest, { actions as formTestActions } from "./page/formTest"
import { InitialState as ToDoState } from "./page/todo/types"
import todo, { actions as todoActions } from "./page/todo"

export const actions = {
  app: {
    ...checkTokenActions,
  },
  pages: {
    formTest: formTestActions,
    todo: todoActions,
  },
}

export interface InitialState {
  app: {
    checkToken: CheckTokenState
  }
  pages: {
    formTest: FormTestState
    todo: ToDoState
  }
}

export default combineReducers({
  app: combineReducers({
    checkToken,
  }),
  pages: combineReducers({
    formTest,
    todo,
  }),
})
