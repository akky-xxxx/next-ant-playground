/**
 * import node_modules
 */
import { connect } from "react-redux"

/**
 * import components
 */
import FormTest from "../../components/pages/formTest"

/**
 * import others
 */
import { pageNameMap } from "../../shared/const/common"
import { InitialState, actions } from "../../store/modules"
import { HandleActions } from "../../store/modules/page/todo/types"

/**
 * main
 */
FormTest.getInitialProps = async () => {
  return {
    currentPage: pageNameMap.formTest,
  }
}

const {
  pages: {
    todo: { addField, changeValue, removeField, getTodoList },
  },
} = actions

export default connect<{}, HandleActions, {}, InitialState>(
  state => state.pages.todo,
  dispatch => ({
    handleAddField: payload => dispatch(addField(payload)),
    handleChangeValue: payload => dispatch(changeValue(payload)),
    handleRemoveField: payload => dispatch(removeField(payload)),
    handleGetTodoList: () => dispatch(getTodoList()),
  }),
)(FormTest)
