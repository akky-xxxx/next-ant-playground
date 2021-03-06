export type PageName = "top" | "todo" | "pcComponents" | "spComponents" | "formTest" | "conditionForm" | "antTable"

export type PageNameMap = {
  [key in PageName]?: PageName
}

export interface GetInitialPropsReturn {
  currentPage?: PageName
}

export interface ErrorPayload {
  statusCode?: number
  message?: string
}

export interface ErrorAction {
  payload: ErrorPayload
}

export type AnyObject = Record<string, unknown>
