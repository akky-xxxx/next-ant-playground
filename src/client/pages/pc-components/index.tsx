/**
 * import node_modules
 */
import { connect } from "react-redux"

/**
 * import others
 */
import { pageNameMap } from "../../shared/const/common"
import { InitialState, actions } from "../../store/modules"

import PcComponents, { HandleActions } from "../../components/pages/pcComponents"

const {
  app: { checkToken },
} = actions

PcComponents.getInitialProps = async () => {
  return {
    currentPage: pageNameMap.pcComponents,
  }
}

export default connect<{}, HandleActions, {}, InitialState>(
  () => ({}),
  () => dispatch => ({
    handleCheckToken: () => dispatch(checkToken()),
  }),
)(PcComponents)
