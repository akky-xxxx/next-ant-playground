/**
 * main
 */
export interface InitialState {
  master: {
    isLoading: boolean
  }
}

export interface HandleActions {
  handleGetTodoList: () => void
}
