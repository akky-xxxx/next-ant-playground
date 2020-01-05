/**
 * import others
 */
import { ApiType } from "../types"
import { createToDoItems } from "../utils"

const defaultPattern: ApiType = {
  title: "TODO データ取得",
  description: "デフォルト",
  request: {
    method: "GET",
    path: ["api", "todo", "get"],
    body: undefined,
  },
  response: {
    status: 200,
    body: createToDoItems(10, "default pattern"),
  },
}

export default defaultPattern
