/**
 * import node_modules
 */
import { connect } from "react-redux"

/**
 * import components
 */
import AntTable, { HandleActions } from "../../components/pages/antTable"

/**
 * import others
 */
import { pageNameMap } from "../../shared/const/common"
import { InitialState, actions } from "../../store/modules"

const {
  app: { checkToken },
} = actions

AntTable.getInitialProps = async () => {
  return {
    currentPage: pageNameMap.antTable,
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
)(AntTable)
