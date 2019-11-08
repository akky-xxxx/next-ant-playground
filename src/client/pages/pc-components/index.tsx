/**
 * import node_modules
 */
import React, { Fragment } from "react"
import { NextPage } from "next"
import { DatePicker, Select } from "antd"

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

const optionList = values.map((value, index) => <Option key={index}>{value}</Option>)

const PcComponents: NextPage = () => {
  return (
    <Fragment>
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
