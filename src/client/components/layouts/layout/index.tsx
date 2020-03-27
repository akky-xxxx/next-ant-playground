/**
 * import node_modules
 */
import React, { ReactNode, FunctionComponent, Fragment } from "react"

/**
 * import components
 */
import GlobalMenu from "../globalMenu"

/**
 * import
 */
import { PageName } from "../../../shared/types/common"

interface LayoutProps {
  children: ReactNode
  currentPage: PageName
}

/**
 * main
 */
const Layout: FunctionComponent<LayoutProps> = (props) => {
  const { children, currentPage } = props

  return (
    <Fragment>
      <header>
        <GlobalMenu currentPage={currentPage} />
      </header>
      <main>{children}</main>
    </Fragment>
  )
}

export default Layout
