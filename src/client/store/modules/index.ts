import { combineReducers } from "redux"
import { InitialState as FormTestState } from "./page/formTest/types"
import formTest, { actions as formTestActions } from "./page/formTest"

export const actions = {
  pages: {
    formTest: formTestActions,
  },
}

export interface InitialState {
  pages: {
    formTest: FormTestState
  }
}

export default combineReducers({
  pages: combineReducers({
    formTest,
  }),
})
