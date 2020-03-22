/**
 * import node_modules
 */
import { connect } from "react-redux"

/**
 * import components
 */
import FormTest, { HandleActions } from "../../components/pages/formTest"

/**
 * import others
 */
import { pageNameMap } from "../../shared/const/common"
import { InitialState, actions } from "../../store/modules"

/**
 * main
 */
FormTest.getInitialProps = async () => {
  return {
    currentPage: pageNameMap.formTest,
  }
}

const {
  app: { checkToken },
  pages: {
    formTest: { addField, changeValue, removeField },
  },
} = actions

export default connect<{}, HandleActions, {}, InitialState>(
  state => {
    const {
      app,
      pages: { formTest },
    } = state

    return {
      app,
      formTest,
    }
  },
  dispatch => ({
    handleCheckToken: () => dispatch(checkToken()),
    handleAddField: payload => dispatch(addField(payload)),
    handleChangeValue: payload => dispatch(changeValue(payload)),
    handleRemoveField: payload => dispatch(removeField(payload)),
  }),
)(FormTest)
