/**
 * import node_modules
 */
import { combineReducers } from "redux"
import { steps } from "redux-effects-steps"
import { fetchrRead } from "redux-effects-fetchr"

/**
 * import toolkit modules
 */
import todoModule from "./page/todo"
import formTestModule from "./page/formTest"

/**
 * import others
 */
import appReducer, { InitialState as AppState, actions as appActions } from "./app"
import { InitialState as FormTestState } from "./page/formTest/types"
import { InitialState as ToDoState } from "./page/todo/types"

/**
 * main
 */
const { actions: formTestActions, reducer: formTest } = formTestModule
const { actions: todoActions, reducer: todo } = todoModule
const { listRequest, listSuccess, listFail } = todoActions
const getTodoList = () => {
  return steps(listRequest(), fetchrRead("getTodo"), [listSuccess, listFail])
}

export const actions = {
  app: {
    ...appActions,
  },
  pages: {
    formTest: formTestActions,
    todo: {
      getTodoList,
    },
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
