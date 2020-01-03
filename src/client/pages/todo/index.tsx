/**
 * import node_modules
 */
import { connect } from "react-redux"

/**
 * import others
 */
import { pageNameMap } from "../../shared/const/common"
import { InitialState, actions } from "../../store/modules"
import { HandleActions } from "../../store/modules/page/todo/types"

/**
 * import components
 */
import Todo from "../../components/pages/todo"

/**
 * main
 */
const {
  pages: {
    todo: { getTodoList },
  },
} = actions

Todo.getInitialProps = async () => {
  return {
    currentPage: pageNameMap.todo,
  }
}

export default connect<{}, HandleActions, {}, InitialState>(
  state => state.pages.todo,
  dispatch => ({
    handleGetTodoList: () => dispatch(getTodoList()),
  }),
)(Todo)
