import { combineReducers } from "redux"

import appReducer, { InitialState as AppState, actions as appActions } from "./app"
import { InitialState as FormTestState } from "./page/formTest/types"
import formTestModule from "./page/formTest"
import { InitialState as ToDoState } from "./page/todo/types"
import todo, { actions as todoActions } from "./page/todo"

const { actions: formTestActions, reducer: formTest } = formTestModule

export const actions = {
  app: {
    ...appActions,
  },
  pages: {
    formTest: formTestActions,
    todo: todoActions,
  },
}

export interface InitialState {
  app: AppState
  pages: {
    formTest: FormTestState
    todo: ToDoState
  }
}

export default combineReducers({
  app: appReducer,
  pages: combineReducers({
    formTest,
    todo,
  }),
})
