/**
 * import node_modules
 */
import React, { useEffect } from "react"
import { NextPage } from "next"
import Head from "next/head"
import { DatePicker, Select, Spin } from "antd"
import { v4 as uuid } from "uuid"

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

interface PcComponentsProps extends HandleActions {
  app: AppState
}

const { Option } = Select

const values = [
  "あいうえおかきくえこさしすせそたちつてとなにぬねのまみむめもやゆよらりるれろわをんあいうえおかきくえこさしすせそたちつてとなにぬねのまみむめもやゆよらりるれろわをんあいうえおかきくえこさしすせそたちつ",
  "あいうえおかきくえこさしすせそたちつてとなにぬねのまみむめもやゆよらりるれろわをんあいうえおかきくえこさしすせそたちつてとなにぬねのまみむめもやゆよらりるれろわをんあいうえおかきくえこさしすせそたちつ",
] as const

const optionList = values.map((value) => (
  <Option key={uuid()} value={value}>
    {value}
  </Option>
))

const PcComponents: NextPage<PcComponentsProps, GetInitialPropsReturn> = (props) => {
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
        <title>components of ant design</title>
      </Head>
      <h1>pc components</h1>
      <h2>DatePicker</h2>
      <div>
        <DatePicker />
      </div>

      <h2>Select</h2>
      <div>
        <Select style={{ width: "100%" }}>{optionList}</Select>
      </div>
    </Spin>
  )
}

export default PcComponents
