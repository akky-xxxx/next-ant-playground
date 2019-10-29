/**
 * import node_modules
 */
import React from "react"
import Link from "next/link"
import styled from "styled-components"
import { Button } from "antd"

/**
 * main
 */
const Top = () => {
  return (
    <Wrapper>
      <ul>
        <MenuItem>
          <Link href="/todo" passHref>
            <a>
              <Button>Button</Button>
            </a>
          </Link>
        </MenuItem>

        <MenuItem>
          <Link href="/pc-components" passHref>
            <a>
              <Button>PC components</Button>
            </a>
          </Link>
        </MenuItem>

        <MenuItem>
          <Link href="/sp-components" passHref>
            <a>
              <Button>SP component</Button>
            </a>
          </Link>
        </MenuItem>
      </ul>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`

const MenuItem = styled.li`
  text-align: center;

  & + & {
    margin-top: 20px;
  }
`

export default Top
