/**
 * import node_modules
 */
import React, { Fragment, useEffect } from "react"
import { NextPage } from "next"
import Head from "next/head"
import { DatePicker, Select } from "antd"
import { v4 as uuid } from "uuid"

/**
 * import others
 */
import { GetInitialPropsReturn } from "../../../shared/types/common"
import { HandleActions as HandleCheckTokenActions } from "../../../store/modules/app/checkToken/types"
import isDev from "../../../shared/utils/isDev"

/**
 * main
 */
export type HandleActions = HandleCheckTokenActions
const { Option } = Select

const values = [
  "あいうえおかきくえこさしすせそたちつてとなにぬねのまみむめもやゆよらりるれろわをんあいうえおかきくえこさしすせそたちつてとなにぬねのまみむめもやゆよらりるれろわをんあいうえおかきくえこさしすせそたちつ",
  "あいうえおかきくえこさしすせそたちつてとなにぬねのまみむめもやゆよらりるれろわをんあいうえおかきくえこさしすせそたちつてとなにぬねのまみむめもやゆよらりるれろわをんあいうえおかきくえこさしすせそたちつ",
] as const

const optionList = values.map(value => (
  <Option key={uuid()} value={value}>
    {value}
  </Option>
))

const PcComponents: NextPage<HandleActions, GetInitialPropsReturn> = props => {
  const { handleCheckToken } = props

  useEffect(() => {
    if (!isDev) handleCheckToken()
  }, [])

  return (
    <Fragment>
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
    </Fragment>
  )
}

export default PcComponents
