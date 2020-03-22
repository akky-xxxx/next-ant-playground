/**
 * import node_modules
 */
import { Action } from "redux-actions"

/**
 * main
 */
export interface ToDoItem {
  id: string
  title: string
  detail: string
  isDone: boolean
}

export interface InitialState {
  master: {
    isLoading: boolean
    todoList: ToDoItem[]
  }
}

export interface SuccessAction {
  payload: ToDoItem[]
}

export interface HandleActions {
  handleGetTodoList: () => Action<void>
}
