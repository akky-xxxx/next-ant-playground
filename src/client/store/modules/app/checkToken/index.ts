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
import { ErrorPayload } from "../../../../shared/types/common"
import STATUS_MESSAGES from "../../../../shared/const/statusMessages"

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
  errorMessage: "",
}

// reducer
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = handleActions<InitialState, any>(
  {
    [CHECK_TOKEN_REQUEST]: state => ({
      ...state,
      isLoading: true,
      errorMessage: "",
    }),
    [CHECK_TOKEN_SUCCESS]: state => ({
      ...state,
      isLoading: false,
    }),
    [CHECK_TOKEN_FAIL]: (state, action: ErrorPayload) => {
      const {
        payload: { statusCode },
      } = action
      const errorMessage = STATUS_MESSAGES[statusCode] || STATUS_MESSAGES[500]

      return {
        ...state,
        isLoading: false,
        errorMessage,
      }
    },
  },
  initialState,
)

export default reducer
