import axios from "axios"
import BaseService from "./BaseService"

/**
 * ToDo一覧取得
 */
export default class ToDoListGet extends BaseService {
  // TODO: any を外せたら外す
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(config: any) {
    super(config, "getTodo", "/api/todo/get", {})
    this.axios = axios.create(config)
  }
}
