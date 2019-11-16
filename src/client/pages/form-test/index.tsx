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
import { ChangeValuePayload, RemoveFieldPayload } from "../../store/modules/page/todo"

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
const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleAddField: () => dispatch(addField()),
  handleChangeValue: ({ targetId, newValue, isRequire }: ChangeValuePayload) =>
    dispatch(changeValue({ targetId, newValue, isRequire })),
  handleRemoveField: ({ targetId }: RemoveFieldPayload) => dispatch(removeField({ targetId })),
})

export default connect(mapStateToProps, mapDispatchToProps)(FormTest)
