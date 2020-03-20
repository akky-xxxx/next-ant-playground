import { default as ToDoListGet } from "./ToDoListGet"
import CheckToken from "./CheckToken"

export type Services = typeof ToDoListGet

export default {
  ToDoListGet,
  CheckToken,
}
