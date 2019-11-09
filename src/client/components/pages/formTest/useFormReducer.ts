/**
 * import node_modules
 */
import { useReducer } from "react"
import { createAction, handleActions } from "redux-actions"
import uuid from "uuid"
import { clone } from "remeda"
import { combine } from "favalid"

/**
 * import others
 */
import { validatorRequired, validatorNumber } from "../../../shared/utils/validator"

/**
 * main
 */
export interface Field {
  id: string
  inputValue: null | string
  isInput: boolean
  isValid: boolean
  errorMessage: null | string
}

interface InitialState {
  fields: Field[]
}

interface ChangeValuePayload {
  targetId: string
  newValue: string
  isRequire: boolean
}

interface ChangeValueAction {
  payload: ChangeValuePayload
}

interface RemoveFieldPayload {
  targetId: string
}

interface RemoveFieldAction {
  payload: RemoveFieldPayload
}

// create action types
const CHANGE_VALUE = "changeValue"
const FIELD_ADD = "field/add"
const FIELD_REMOVE = "field/remove"

// create action
const changeValue = createAction<ChangeValuePayload>(CHANGE_VALUE)
const addField = createAction(FIELD_ADD)
const removeField = createAction<RemoveFieldPayload>(FIELD_REMOVE)

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

      const validatorRules = []
      if (isRequire) validatorRules.push(validatorRequired)
      if (newValue) {
        validatorRules.push(validatorNumber)
      }
      const validator = combine(...validatorRules)

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
  },
  initialState,
)

const useFormReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleChangeValue = (targetId: string, newValue: string, isRequire: boolean) =>
    dispatch(changeValue({ targetId, newValue, isRequire }))
  const handleAddField = () => dispatch(addField())
  const handleRemoveField = (targetId: string) => dispatch(removeField({ targetId }))

  return {
    state,
    handleChangeValue,
    handleAddField,
    handleRemoveField,
  }
}

export default useFormReducer
