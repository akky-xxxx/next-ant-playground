import React, { ReactNode, FunctionComponent, Fragment } from "react"

import GlobalMenu from "../globalMenu"

interface LayoutProps {
  children: ReactNode
}

const Layout: FunctionComponent<LayoutProps> = props => {
  const { children } = props

  return (
    <Fragment>
      <header>
        <GlobalMenu />
      </header>
      <main>{children}</main>
    </Fragment>
  )
}

export default Layout
