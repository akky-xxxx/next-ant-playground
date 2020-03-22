/**
 * import node_modules
 */
import React, { useEffect } from "react"
import { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import styled from "styled-components"
import { Button } from "antd"

/**
 * import others
 */
import { GetInitialPropsReturn } from "../../../shared/types/common"
import { menuData, pageNameMap } from "../../../shared/const/common"
import { HandleActions as HandleCheckTokenActions } from "../../../store/modules/app/checkToken/types"
import isDev from "../../../shared/utils/isDev"

/**
 * main
 */
export type HandleActions = HandleCheckTokenActions

const Top: NextPage<HandleActions, GetInitialPropsReturn> = props => {
  const { handleCheckToken } = props

  useEffect(() => {
    if (!isDev) handleCheckToken()
  }, [])

  return (
    <Wrapper>
      <Head>
        <title>playground of Next.js and ant design</title>
      </Head>
      <ul>
        {menuData
          .filter((_, index) => index > 0)
          .map(page => {
            const { href, label } = page
            return (
              <MenuItem key={href}>
                <Link href={href} passHref>
                  <a>
                    <Button>{label}</Button>
                  </a>
                </Link>
              </MenuItem>
            )
          })}
      </ul>
    </Wrapper>
  )
}

Top.getInitialProps = async () => {
  return {
    currentPage: pageNameMap.top,
  }
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`

const MenuItem = styled.li`
  text-align: center;

  & + & {
    margin-top: 20px;
  }
`

export default Top
