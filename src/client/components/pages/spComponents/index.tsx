/**
 * import node_modules
 */
import React, { useEffect } from "react"
import { NextPage } from "next"
import Head from "next/head"
import { Spin } from "antd"
import { DatePicker, Picker, List } from "antd-mobile"

/**
 * import others
 */
import { GetInitialPropsReturn } from "../../../shared/types/common"
import { HandleActions as HandleCheckTokenActions } from "../../../store/modules/app/checkToken/types"
import { InitialState as AppState } from "../../../store/modules/app"

/**
 * main
 */
export type HandleActions = HandleCheckTokenActions

interface PcComponents extends HandleActions {
  app: AppState
}

const values = [
  {
    label:
      "あいうえおかきくえこさしすせそたちつてとなにぬねのまみむめもやゆよらりるれろわをんあいうえおかきくえこさしすせそたちつてとなにぬねのまみむめもやゆよらりるれろわをんあいうえおかきくえこさしすせそたちつ",
    value: 1,
    children: [],
  },
  {
    label:
      "あいうえおかきくえこさしすせそたちつてとなにぬねのまみむめもやゆよらりるれろわをんあいうえおかきくえこさしすせそたちつてとなにぬねのまみむめもやゆよらりるれろわをんあいうえおかきくえこさしすせそたちつ",
    value: 2,
    children: [],
  },
]

const style = {
  color: "red",
  whiteSpace: "normal",
  height: "auto",
}

const indicatorStyle = {
  border: "1px solid #000",
}

const PcComponents: NextPage<PcComponents, GetInitialPropsReturn> = (props) => {
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
        <title>components of ant design mobile</title>
      </Head>
      <h1>sp components</h1>
      <h2>DatePicker</h2>
      <div>
        <DatePicker mode="date">
          <div>date picker</div>
        </DatePicker>
      </div>

      <h2>Picker</h2>
      <div>
        <List>
          <Picker data={values} cols={1} itemStyle={style} indicatorStyle={indicatorStyle}>
            <List.Item>picker</List.Item>
          </Picker>
        </List>
      </div>
    </Spin>
  )
}

export default PcComponents
