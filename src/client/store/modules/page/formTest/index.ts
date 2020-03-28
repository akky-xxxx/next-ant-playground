/**
 * import node_modules
 */
import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuid } from "uuid"
import { clone } from "remeda"

/**
 * import others
 */
import { Field, InitialState, AddFieldAction, ChangeValueAction, RemoveFieldAction } from "./types"
import getValidator from "../../../../shared/utils/validator/getValidator"

/**
 * main
 */
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

const formTestModule = createSlice({
  name: "pages/formTest",
  initialState,
  reducers: {
    changeValue: (state, action: ChangeValueAction) => {
      const newState = clone(state)
      const {
        payload: { newValue, targetId, isRequire },
      } = action

      const validator = getValidator("number", isRequire, Boolean(newValue))
      const validateResult = validator(newValue)

      return {
        ...newState,
        fields: newState.fields.map((field) => {
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

    fieldAdd: (state, action: AddFieldAction) => {
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
      const dividePoint = fields.findIndex((filed) => filed.id === targetId) + 1
      const beforeFields = fields.slice(0, dividePoint)
      const afterFields = fields.slice(dividePoint, fields.length)

      return {
        ...newState,
        fields: [...beforeFields, additionData, ...afterFields],
      }
    },

    fieldRemove: (state, action: RemoveFieldAction) => {
      const newState = clone(state)
      const {
        payload: { targetId },
      } = action

      return {
        ...newState,
        fields: newState.fields.filter((field) => field.id !== targetId),
      }
    },

    fieldReset: () => {
      return initialState
    },
  },
})

export default formTestModule
