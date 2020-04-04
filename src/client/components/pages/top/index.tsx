/**
 * import node_modules
 */
import React, { useEffect } from "react"
import { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import styled from "styled-components"
import { Button, Spin } from "antd"

/**
 * import others
 */
import { GetInitialPropsReturn } from "../../../shared/types/common"
import { menuData, pageNameMap } from "../../../shared/const/common"
import { HandleActions as HandleCheckTokenActions } from "../../../store/modules/app/checkToken/types"
import { InitialState as AppState } from "../../../store/modules/app"

/**
 * main
 */
export type HandleActions = HandleCheckTokenActions

interface TopProps extends HandleActions {
  app: AppState
}

const Top: NextPage<TopProps, GetInitialPropsReturn> = (props) => {
  const {
    handleCheckToken,
    app: { checkToken },
  } = props

  useEffect(() => {
    handleCheckToken()
  }, [])

  return (
    <Spin spinning={checkToken.isLoading}>
      <Head>
        <title>playground of Next.js and ant design</title>
      </Head>

      <Wrapper>
        <ul>
          {menuData
            .filter((_, index) => index > 0)
            .map((page) => {
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
    </Spin>
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
