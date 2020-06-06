/**
 * import node_modules
 */
import { connect } from "react-redux"

/**
 * import components
 */
import ConditionForm, { HandleActions } from "../../components/pages/conditionForm"

/**
 * import others
 */
import { pageNameMap } from "../../shared/const/common"
import { InitialState, actions } from "../../store/modules"

/**
 * main
 */
const {
  app: { checkToken },
} = actions

ConditionForm.getInitialProps = async () => {
  return {
    currentPage: pageNameMap.conditionForm,
  }
}

export default connect<unknown, HandleActions, unknown, InitialState>(
  (state) => {
    const { app } = state

    return {
      app,
    }
  },
  () => (dispatch) => ({
    handleCheckToken: () => dispatch(checkToken()),
  }),
)(ConditionForm)
