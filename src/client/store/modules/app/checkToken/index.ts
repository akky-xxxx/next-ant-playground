/**
 * import node_modules
 */
import { createSlice } from "@reduxjs/toolkit"

/**
 * import others
 */
import { InitialState } from "./types"
import { ErrorAction } from "../../../../shared/types/common"
import getErrorMessage from "../../../../shared/utils/getErrorMessage"

/**
 * main
 */
// initialState
const initialState: InitialState = {
  isLoading: false,
  errorMessage: "",
}

const checkTokenModule = createSlice({
  name: "checkToken",
  initialState,
  reducers: {
    request: (state) => ({
      ...state,
      isLoading: true,
      errorMessage: "",
    }),

    success: (state) => ({
      ...state,
      isLoading: false,
    }),

    fail: (state, action: ErrorAction) => {
      const {
        payload: { statusCode, message },
      } = action

      return {
        ...state,
        isLoading: false,
        errorMessage: getErrorMessage(message, statusCode),
      }
    },
  },
})

export default checkTokenModule
