/**
 * import node_modules
 */
import { createAction, handleActions } from "redux-actions"
import uuid from "uuid"
import { clone } from "remeda"

/**
 * import others
 */
import {
  Field,
  InitialState,
  ChangeValuePayload,
  ChangeValueAction,
  RemoveFieldPayload,
  RemoveFieldAction,
} from "./types"
import getValidator from "../../../../shared/utils/validator/getValidator"

/**
 * main
 */
// create action types
const CHANGE_VALUE = "changeValue"
const FIELD_ADD = "field/add"
const FIELD_REMOVE = "field/remove"
const FIELD_RESET = "field/reset"

// create action
const changeValue = createAction<ChangeValuePayload>(CHANGE_VALUE)
const addField = createAction(FIELD_ADD)
const removeField = createAction<RemoveFieldPayload>(FIELD_REMOVE)
const resetField = createAction(FIELD_RESET)

export const actions = {
  changeValue,
  addField,
  removeField,
  resetField,
}

// initialState
const initialState: InitialState = {
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

    [FIELD_ADD]: state => {
      const newState = clone(state)
      const additionData: Field = {
        id: uuid(),
        inputValue: null,
        isInput: false,
        isValid: false,
        errorMessage: null,
      }

      return {
        ...newState,
        fields: [...newState.fields, additionData],
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
  },
  initialState,
)

export default reducer
