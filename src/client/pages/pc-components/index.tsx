/**
 * import node_modules
 */
import { connect } from "react-redux"

/**
 * import components
 */
import PcComponents, { HandleActions } from "../../components/pages/pcComponents"

/**
 * import others
 */
import { pageNameMap } from "../../shared/const/common"
import { InitialState, actions } from "../../store/modules"

const {
  app: { checkToken },
} = actions

PcComponents.getInitialProps = async () => {
  return {
    currentPage: pageNameMap.pcComponents,
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
)(PcComponents)
