/**
 * import
 */
import { ToDoItem } from "./types"

export const createToDoItems: (itemNum: number, title: string) => ToDoItem[] = (itemNum, title) =>
  [...Array(itemNum)].fill("").map((_, index) => ({
    id: String(index + 1),
    title,
    detail: "",
    isDone: false,
  }))
