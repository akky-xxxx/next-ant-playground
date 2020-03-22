/**
 * import node_modules
 */
import React, { Fragment, useEffect } from "react"
import { NextPage } from "next"
import { Table, Spin } from "antd"
import { PaginationConfig } from "antd/es/pagination"
import { ColumnProps } from "antd/es/table"

/**
 * import others
 */
import { GetInitialPropsReturn } from "../../../shared/types/common"
import { HandleActions as HandleTodoActions } from "../../../store/modules/app/checkToken/types"
import { InitialState as AppState } from "../../../store/modules/app"
import isDev from "../../../shared/utils/isDev"

/**
 * main
 */
export type HandleActions = HandleTodoActions

interface TableWindowProps extends HandleActions {
  app: AppState
}

interface Data {
  key: number
  name: string
  sex: "1" | "2"
}

const data: Data[] = [...new Array(100)].fill("").map((_, index) => ({
  key: index,
  name: `住民 ${index + 1}`,
  sex: index % 2 ? "1" : "2",
}))

const columns: ColumnProps<Data>[] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Sex",
    dataIndex: "sex",
    key: "sex",
    render: value => <Fragment>{value === "1" ? "男" : "女"}</Fragment>,
  },
]

const paginationOption: PaginationConfig = {
  defaultPageSize: 20,
  position: "both",
}

const TableWindow: NextPage<TableWindowProps, GetInitialPropsReturn> = props => {
  const {
    handleCheckToken,
    app: { checkToken },
  } = props

  useEffect(() => {
    if (!isDev) handleCheckToken()
  }, [])

  return (
    <Spin spinning={checkToken.isLoading}>
      <Table columns={columns} dataSource={data} pagination={paginationOption} />
    </Spin>
  )
}

export default TableWindow
