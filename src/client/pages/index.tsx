/**
 * import node_modules
 */
import { connect } from "react-redux"

/**
 * import components
 */
import Top, { HandleActions } from "../components/pages/top"

/**
 * import others
 */
import { pageNameMap } from "../shared/const/common"
import { InitialState, actions } from "../store/modules"

/**
 * main
 */
const {
  app: { checkToken },
} = actions

Top.getInitialProps = async () => {
  return {
    currentPage: pageNameMap.top,
  }
}

export default connect<unknown, HandleActions, unknown, InitialState>(
  (state) => {
    const { app } = state

    return {
      app,
    }
  },
  (dispatch) => ({
    handleCheckToken: () => dispatch(checkToken()),
  }),
)(Top)
