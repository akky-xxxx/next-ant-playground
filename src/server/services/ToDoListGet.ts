import axios from "axios"
import BaseService from "./BaseService"

/**
 * ToDo一覧取得
 */
export default class ToDoListGet extends BaseService {
  constructor(config: any) {
    super(config, "getTodo", "/api/todo/get", {})
    this.axios = axios.create(config)
  }
}
