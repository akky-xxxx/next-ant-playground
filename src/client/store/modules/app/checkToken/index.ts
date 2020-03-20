/**
 * import node_modules
 */
import { createAction, handleActions } from "redux-actions"
import { steps } from "redux-effects-steps"
import { fetchrCreate } from "redux-effects-fetchr"

/**
 * import others
 */
import { InitialState } from "./types"
import { createAsyncActionTypes } from "../../utils"

/**
 * main
 */
// create action types
const NAMESPACE = "checkUpdate"
const [CHECK_TOKEN_REQUEST, CHECK_TOKEN_SUCCESS, CHECK_TOKEN_FAIL] = createAsyncActionTypes(NAMESPACE)

// create action
const checkTokenRequest = createAction(CHECK_TOKEN_REQUEST)
const checkTokenSuccess = createAction(CHECK_TOKEN_SUCCESS)
const checkTokenFail = createAction(CHECK_TOKEN_FAIL)
const checkToken = () => {
  return steps(checkTokenRequest(), fetchrCreate("checkToken"), [checkTokenSuccess, checkTokenFail])
}

export const actions = {
  checkToken,
}

// initialState
const initialState: InitialState = {
  isLoading: false,
}

// reducer
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = handleActions<InitialState, any>(
  {
    [CHECK_TOKEN_REQUEST]: state => ({
      ...state,
      isLoading: true,
    }),
    [CHECK_TOKEN_SUCCESS]: state => ({
      ...state,
      isLoading: false,
    }),
    [CHECK_TOKEN_FAIL]: state => ({
      ...state,
      isLoading: false,
    }),
  },
  initialState,
)

export default reducer
