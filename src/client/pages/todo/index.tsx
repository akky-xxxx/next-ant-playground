/**
 * import node_modules
 */
import { connect } from "react-redux"

/**
 * import others
 */
import { pageNameMap } from "../../shared/const/common"
import { InitialState, actions } from "../../store/modules"

/**
 * import components
 */
import Todo, { HandleActions } from "../../components/pages/todo"

/**
 * main
 */
const {
  app: { checkToken },
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
  state => {
    const {
      app,
      pages: { todo },
    } = state

    return {
      app,
      todo,
    }
  },
  dispatch => ({
    handleCheckToken: () => dispatch(checkToken()),
    handleGetTodoList: () => dispatch(getTodoList()),
  }),
)(Todo)
