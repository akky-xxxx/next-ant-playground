/**
 * import node_modules
 */
import { connect } from "react-redux"

/**
 * import components
 */
import SpComponents, { HandleActions } from "../../components/pages/spComponents"

/**
 * import others
 */
import { pageNameMap } from "../../shared/const/common"
import { InitialState, actions } from "../../store/modules"

const {
  app: { checkToken },
} = actions

SpComponents.getInitialProps = async () => {
  return {
    currentPage: pageNameMap.spComponents,
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
)(SpComponents)
