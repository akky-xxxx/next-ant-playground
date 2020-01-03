import BaseService from "./BaseService"

/**
 * ToDo一覧取得
 */
export default class ToDoListGet extends BaseService {
  constructor() {
    super("getTodo", ["/api/todo/get"])
  }
}
