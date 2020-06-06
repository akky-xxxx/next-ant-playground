/**
 * import node_modules
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { APIDef, GET, ResponseDef, Success200, Error400 } from "agreed-typed"

/**
 * import others
 */
import { AgreedUi } from "../../types"

export interface ToDoItem {
  id: string
  title: string
  detail: string
  isDone: boolean
}

type ResponseBodyType = ToDoItem[]
export type AnyObject = Record<string, unknown>

export type ApiType = AgreedUi &
  APIDef<
    GET, // HTTP Method
    ["api", "todo", "get"], // API Path
    AnyObject, // request header
    AnyObject, // request query
    undefined, // request body
    AnyObject, // response header
    ResponseDef<Success200, ResponseBodyType> | ResponseDef<Error400, { errorMessage: "error message" }> // response body
  >
