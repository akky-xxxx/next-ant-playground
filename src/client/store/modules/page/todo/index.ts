/**
 * import node_modules
 */
import { createAction, handleActions } from "redux-actions"
import uuid from "uuid"
import { clone } from "remeda"
import { steps } from "redux-effects-steps"
import { fetchrRead } from "redux-effects-fetchr"

/**
 * import others
 */
import {
  Field,
  InitialState,
  AddFieldPayload,
  AddFieldAction,
  ChangeValuePayload,
  ChangeValueAction,
  RemoveFieldPayload,
  RemoveFieldAction,
} from "./types"
import getValidator from "../../../../shared/utils/validator/getValidator"
import { createAsyncActionTypes } from "../../utils"

/**
 * main
 */
// create action types
const CHANGE_VALUE = "changeValue"
const FIELD_ADD = "field/add"
const FIELD_REMOVE = "field/remove"
const FIELD_RESET = "field/reset"
// TODO form 関連と todo のファイルをわける
const TODO_LIST = "todo"
const [TODO_LIST_REQUEST, TODO_LIST_SUCCESS, TODO_LIST_FAIL] = createAsyncActionTypes(TODO_LIST)

// create action
const changeValue = createAction<ChangeValuePayload>(CHANGE_VALUE)
const addField = createAction<AddFieldPayload>(FIELD_ADD)
const removeField = createAction<RemoveFieldPayload>(FIELD_REMOVE)
const resetField = createAction(FIELD_RESET)
const todoListRequest = createAction(TODO_LIST_REQUEST)
const todoListSuccess = createAction(TODO_LIST_SUCCESS)
const todoListFail = createAction(TODO_LIST_FAIL)
const getTodoList = () => {
  return steps(todoListRequest(), fetchrRead("getTodo"), [todoListSuccess, todoListFail])
}

export const actions = {
  changeValue,
  addField,
  removeField,
  resetField,
  getTodoList,
}

// initialState
const initialState: InitialState = {
  master: {
    isLoading: true,
  },
  fields: [
    {
      id: uuid(),
      inputValue: null,
      isInput: false,
      isValid: false,
      errorMessage: null,
    },
  ],
}

// reducer
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = handleActions<InitialState, any>(
  {
    [CHANGE_VALUE]: (state, action: ChangeValueAction) => {
      const newState = clone(state)
      const {
        payload: { newValue, targetId, isRequire },
      } = action

      const validator = getValidator("number", isRequire, Boolean(newValue))
      const validateResult = validator(newValue)

      return {
        ...newState,
        fields: newState.fields.map(field => {
          const { id } = field
          if (id !== targetId) return field

          return {
            id: targetId,
            inputValue: newValue,
            isInput: true,
            isValid: !validateResult.error,
            errorMessage: validateResult.error ? validateResult.message : null,
          }
        }),
      }
    },

    [FIELD_ADD]: (state, action: AddFieldAction) => {
      const {
        payload: { targetId },
      } = action
      const newState = clone(state)
      const additionData: Field = {
        id: uuid(),
        inputValue: null,
        isInput: false,
        isValid: false,
        errorMessage: null,
      }
      const { fields } = newState
      const dividePoint = fields.findIndex(filed => filed.id === targetId) + 1
      const beforeFields = fields.slice(0, dividePoint)
      const afterFields = fields.slice(dividePoint, fields.length)

      return {
        ...newState,
        fields: [...beforeFields, additionData, ...afterFields],
      }
    },

    [FIELD_REMOVE]: (state, action: RemoveFieldAction) => {
      const newState = clone(state)
      const {
        payload: { targetId },
      } = action

      return {
        ...newState,
        fields: newState.fields.filter(field => field.id !== targetId),
      }
    },

    [FIELD_RESET]: () => initialState,

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
    [TODO_LIST_SUCCESS]: state => {
      const { master } = state

      return {
        ...state,
        master: {
          ...master,
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
