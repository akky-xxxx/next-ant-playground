/**
 * import node_modules
 */
import React, { FunctionComponent } from "react"
import Link from "next/link"
import styled from "styled-components"
import { Menu } from "antd"
import { Button as SpButton } from "antd-mobile"

/**
 * import others
 */
import { PageName } from "../../../shared/types/common"
import { menuData } from "../../../shared/const/common"

/**
 * main
 */
interface GlobalMenuProps {
  currentPage: PageName
}

const GlobalMenu: FunctionComponent<GlobalMenuProps> = (props) => {
  const { currentPage } = props
  return (
    <Nav>
      <Menu mode="horizontal" theme="dark" selectedKeys={[currentPage]} data-media="pc">
        {menuData.map((data) => {
          const { id, href, label } = data
          return (
            <Menu.Item key={id}>
              <Link href={href} passHref>
                <a>{label}</a>
              </Link>
            </Menu.Item>
          )
        })}
      </Menu>
      <ul data-media="tb">
        {menuData.map((data) => {
          const { href, label } = data
          return (
            <SpMenuListItemWrapper key={encodeURI(href + label)}>
              <Link href={href}>
                <SpButton>{label}</SpButton>
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
const SpMenuListItemWrapper = styled.li`
  & + & {
    margin-top: 4px;
  }
`

export default GlobalMenu
