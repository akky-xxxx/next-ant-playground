/**
 * import others
 */
import { ApiType } from "../types"

const error400: ApiType = {
  title: "TODO データ取得 - 表示確認用",
  description: "Error 400",
  request: {
    method: "GET",
    path: ["api", "todo", "get"],
    body: undefined,
  },
  response: {
    status: 400,
    body: { errorMessage: "error message" },
  },
}

export default error400
