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

export type HandleAddField = (payload: AddFieldPayload) => Action<AddFieldPayload>

export interface ChangeValuePayload {
  targetId: string
  newValue: string
  isRequire: boolean
}

export interface ChangeValueAction {
  payload: ChangeValuePayload
}

export type HandleChangeValue = (payload: ChangeValuePayload) => Action<ChangeValuePayload>

export interface RemoveFieldPayload {
  targetId: string
}

export interface RemoveFieldAction {
  payload: RemoveFieldPayload
}

export type HandleRemoveField = (payload: RemoveFieldPayload) => Action<RemoveFieldPayload>
