/**
 * import node_modules
 */
import { connect } from "react-redux"

/**
 * import others
 */
import { pageNameMap } from "../../shared/const/common"
import { InitialState, actions } from "../../store/modules"

import SpComponents, { HandleActions } from "../../components/pages/spComponents"

const {
  app: { checkToken },
} = actions

SpComponents.getInitialProps = async () => {
  return {
    currentPage: pageNameMap.spComponents,
  }
}

export default connect<{}, HandleActions, {}, InitialState>(
  () => ({}),
  () => dispatch => ({
    handleCheckToken: () => dispatch(checkToken()),
  }),
)(SpComponents)
