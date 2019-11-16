/**
 * import node_modules
 */
import { connect } from "react-redux"
import { Dispatch } from "redux"

/**
 * import components
 */
import FormTest from "../../components/pages/formTest"

/**
 * import others
 */
import { pageNameMap } from "../../shared/const/common"
import { InitialState, actions } from "../../store/modules"
import { HandleRemoveField, HandleAddField, HandleChangeValue } from "../../store/modules/page/todo/types"

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
    todo: { addField, changeValue, removeField },
  },
} = actions

const mapStateToProps = (state: InitialState) => state.pages.todo
const mapDispatchToProps = (dispatch: Dispatch) => {
  const handleActions: {
    handleAddField: HandleAddField
    handleChangeValue: HandleChangeValue
    handleRemoveField: HandleRemoveField
  } = {
    handleAddField: payload => dispatch(addField(payload)),
    handleChangeValue: payload => dispatch(changeValue(payload)),
    handleRemoveField: payload => dispatch(removeField(payload)),
  }

  return handleActions
}

export default connect(mapStateToProps, mapDispatchToProps)(FormTest)
