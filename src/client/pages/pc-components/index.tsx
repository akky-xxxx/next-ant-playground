import React, { Fragment } from "react"
import { DatePicker, Select } from "antd"
import styled from "styled-components"

const { Option } = Select

const values = [
  "あいうえおかきくえこさしすせそたちつてとなにぬねのまみむめもやゆよらりるれろわをんあいうえおかきくえこさしすせそたちつてとなにぬねのまみむめもやゆよらりるれろわをんあいうえおかきくえこさしすせそたちつ",
  "あいうえおかきくえこさしすせそたちつてとなにぬねのまみむめもやゆよらりるれろわをんあいうえおかきくえこさしすせそたちつてとなにぬねのまみむめもやゆよらりるれろわをんあいうえおかきくえこさしすせそたちつ",
] as const

const optionList = values.map((value, index) => (<Option key={index}>{value}</Option>))

const PcComponents = () => {
  return (
    <Fragment>
      <h1>pc components</h1>
      <h2>DatePicker</h2>
      <div>
        <DatePicker />
      </div>

      <h2>Select</h2>
      <div>
        <Select style={{ width: "100%" }}>
          {optionList}
        </Select>
      </div>
    </Fragment>
  )
}

const CustomSelect = styled(Select)<any>`
  width: 100%;
`

export default PcComponents
