/**
 * import node_modules
 */
import React, { Fragment } from "react"
import { NextPage } from "next"
import { DatePicker, Picker, List } from "antd-mobile"

/**
 * import others
 */
import { pageNameMap } from "../../shared/const/common"

/**
 * main
 */
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

const PcComponents: NextPage = () => {
  return (
    <Fragment>
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
    </Fragment>
  )
}

PcComponents.getInitialProps = async () => {
  return {
    currentPage: pageNameMap.spComponents,
  }
}

export default PcComponents
