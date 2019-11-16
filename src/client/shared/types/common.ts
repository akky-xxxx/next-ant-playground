export type PageName = "top" | "todo" | "pcComponents" | "spComponents" | "formTest"

export type PageNameMap = {
  [key in PageName]?: PageName
}

export interface GetInitialPropsReturn {
  currentPage?: PageName
}
