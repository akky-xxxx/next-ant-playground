/**
 * import node_modules
 */
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

interface ResponseBodyType {
  results: ToDoItem[]
}

export type ApiType = AgreedUi &
  APIDef<
    GET, // HTTP Method
    ["api", "todo", "get"], // API Path
    {}, // request header
    {}, // request query
    undefined, // request body
    {}, // response header
    ResponseDef<Success200, ResponseBodyType> | ResponseDef<Error400, { error: "不正操作が行われました" }> // response body
  >
