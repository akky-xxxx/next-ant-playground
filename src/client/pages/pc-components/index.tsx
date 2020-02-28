/**
 * import node_modules
 */
import React, { Fragment } from "react"
import { NextPage } from "next"
import Head from "next/head"
import { DatePicker, Select } from "antd"
import { v4 as uuid } from "uuid"

/**
 * import others
 */
import { pageNameMap } from "../../shared/const/common"

/**
 * main
 */
const { Option } = Select

const values = [
  "あいうえおかきくえこさしすせそたちつてとなにぬねのまみむめもやゆよらりるれろわをんあいうえおかきくえこさしすせそたちつてとなにぬねのまみむめもやゆよらりるれろわをんあいうえおかきくえこさしすせそたちつ",
  "あいうえおかきくえこさしすせそたちつてとなにぬねのまみむめもやゆよらりるれろわをんあいうえおかきくえこさしすせそたちつてとなにぬねのまみむめもやゆよらりるれろわをんあいうえおかきくえこさしすせそたちつ",
] as const

const optionList = values.map(value => <Option key={uuid()}>{value}</Option>)

const PcComponents: NextPage = () => {
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

PcComponents.getInitialProps = async () => {
  return {
    currentPage: pageNameMap.pcComponents,
  }
}

export default PcComponents
