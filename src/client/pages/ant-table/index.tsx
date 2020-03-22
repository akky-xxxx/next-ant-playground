/**
 * import node_modules
 */
import { connect } from "react-redux"

/**
 * import others
 */
import { pageNameMap } from "../../shared/const/common"
import { InitialState, actions } from "../../store/modules"

import AntTable, { HandleActions } from "../../components/pages/antTable"

const {
  app: { checkToken },
} = actions

AntTable.getInitialProps = async () => {
  return {
    currentPage: pageNameMap.antTable,
  }
}

export default connect<{}, HandleActions, {}, InitialState>(
  () => ({}),
  () => dispatch => ({
    handleCheckToken: () => dispatch(checkToken()),
  }),
)(AntTable)
