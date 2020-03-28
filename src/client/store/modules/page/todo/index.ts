/**
 * import node_modules
 */
import { createSlice } from "@reduxjs/toolkit"

/**
 * import others
 */
import { InitialState, SuccessAction } from "./types"

/**
 * main
 */
// initialState}}
const initialState: InitialState = {
  master: {
    isLoading: true,
    todoList: [],
  },
}

const todoModule = createSlice({
  name: "pages/todo",
  initialState,
  reducers: {
    listRequest: (state) => {
      const { master } = state

      return {
        ...state,
        master: {
          ...master,
          isLoading: true,
        },
      }
    },

    listSuccess: (state, action: SuccessAction) => {
      const { master } = state
      const { payload } = action

      return {
        ...state,
        master: {
          ...master,
          todoList: payload,
          isLoading: false,
        },
      }
    },

    listFail: (state) => {
      const { master } = state

      return {
        ...state,
        master: {
          ...master,
          isLoading: false,
        },
      }
    },
  },
})

export default todoModule
