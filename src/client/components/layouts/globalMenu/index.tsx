/**
 * import node_modules
 */
import React from "react"
import Link from "next/link"
import styled from "styled-components"
import { Button as PcButton } from "antd"
import { Button as SpButton } from "antd-mobile"

interface MenuItem {
  href: string
  buttonLabel: string
}

const menuData: MenuItem[] = [
  {
    href: "/",
    buttonLabel: "Top",
  },
  {
    href: "/todo",
    buttonLabel: "Todo",
  },
  {
    href: "/pc-components",
    buttonLabel: "PC Components",
  },
  {
    href: "/sp-components",
    buttonLabel: "SP Components",
  },
]

const GlobalMenu = () => {
  return (
    <Nav>
      <ul data-media="pc">
        {menuData.map(data => {
          const { href, buttonLabel } = data
          return (
            <PcMenuItemWrapper key={encodeURI(href + buttonLabel)}>
              <Link href={href}>
                <PcButton>{buttonLabel}</PcButton>
              </Link>
            </PcMenuItemWrapper>
          )
        })}
      </ul>
      <ul data-media="sp">
        {menuData.map(data => {
          const { href, buttonLabel } = data
          return (
            <SpMenuListItemWrapper key={encodeURI(href + buttonLabel)}>
              <Link href={href}>
                <SpButton>{buttonLabel}</SpButton>
              </Link>
            </SpMenuListItemWrapper>
          )
        })}
      </ul>
    </Nav>
  )
}

const Nav = styled.nav`
  background-color: #333;
  padding: 20px;
`

const PcMenuItemWrapper = styled.li`
  display: inline-block;
  list-style: none;

  & + & {
    margin-left: 20px;
  }
`

const SpMenuListItemWrapper = styled.li`
  & + & {
    margin-top: 4px;
  } 
`

export default GlobalMenu
