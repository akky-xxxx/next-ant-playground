/**
 * import node_modules
 */
import { Action } from "redux-actions"

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

export interface InitialState {
  fields: Field[]
}

export interface AddFieldPayload {
  targetId: string
}

export interface AddFieldAction {
  payload: AddFieldPayload
}

type HandleAddField = (payload: AddFieldPayload) => Action<AddFieldPayload>

export interface ChangeValuePayload {
  targetId: string
  newValue: string
  isRequire: boolean
}

export interface ChangeValueAction {
  payload: ChangeValuePayload
}

type HandleChangeValue = (payload: ChangeValuePayload) => Action<ChangeValuePayload>

export interface RemoveFieldPayload {
  targetId: string
}

export interface RemoveFieldAction {
  payload: RemoveFieldPayload
}

type HandleRemoveField = (payload: RemoveFieldPayload) => Action<RemoveFieldPayload>

export interface HandleActions {
  handleAddField: HandleAddField
  handleChangeValue: HandleChangeValue
  handleRemoveField: HandleRemoveField
}
