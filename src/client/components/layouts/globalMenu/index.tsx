/**
 * import node_modules
 */
import React from "react"
import Link from "next/link"
import styled from "styled-components"
import { Button as PcButton } from "antd"
import { Button as SpButton } from "antd-mobile"

interface Menu {
  href: string
  buttonLabel: string
}

const menuData: Menu[] = [
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
      <PcMenuList>
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
      </PcMenuList>
      <SpMenuList>
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
      </SpMenuList>
    </Nav>
  )
}

const Nav = styled.nav`
  background-color: #333;
  padding: 20px;
`

const PcMenuList = styled.ul`
  padding: 0;

  @media (max-width:480px) {
    display: none;
  }
`

const PcMenuItemWrapper = styled.li`
  display: inline-block;
  list-style: none;

  & + & {
    margin-left: 20px;
  }
`

const SpMenuList = styled.ul`
  padding: 0;

  @media (min-width:481px) {
    display: none;
  }
`

const SpMenuListItemWrapper = styled.li`
  list-style: none;

  & + & {
    margin-top: 4px;
  } 
`

export default GlobalMenu
