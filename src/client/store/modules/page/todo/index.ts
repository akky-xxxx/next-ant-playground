/**
 * import node_modules
 */
import { createAction, handleActions } from "redux-actions"
import { steps } from "redux-effects-steps"
import { fetchrRead } from "redux-effects-fetchr"

/**
 * import others
 */
import { InitialState, SuccessAction } from "./types"
import { createAsyncActionTypes } from "../../utils"

/**
 * main
 */
// create action types
const TODO_LIST = "todo"
const [TODO_LIST_REQUEST, TODO_LIST_SUCCESS, TODO_LIST_FAIL] = createAsyncActionTypes(TODO_LIST)

// create action
const todoListRequest = createAction(TODO_LIST_REQUEST)
const todoListSuccess = createAction(TODO_LIST_SUCCESS)
const todoListFail = createAction(TODO_LIST_FAIL)
const getTodoList = () => {
  return steps(todoListRequest(), fetchrRead("getTodo"), [todoListSuccess, todoListFail])
}

export const actions = {
  getTodoList,
}

// initialState
const initialState: InitialState = {
  master: {
    isLoading: true,
    todoList: [],
  },
}

// reducer
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = handleActions<InitialState, any>(
  {
    [TODO_LIST_REQUEST]: state => {
      const { master } = state

      return {
        ...state,
        master: {
          ...master,
          isLoading: true,
        },
      }
    },
    [TODO_LIST_SUCCESS]: (state, action: SuccessAction) => {
      const { master } = state
      const { payload } = action

      return {
        ...state,
        master: {
          ...master,
          todoList: payload,
          isLoading: false,
        },
      }
    },
    [TODO_LIST_FAIL]: state => {
      const { master } = state

      return {
        ...state,
        master: {
          ...master,
          isLoading: false,
        },
      }
    },
  },
  initialState,
)

export default reducer
