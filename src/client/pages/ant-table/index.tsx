import React, { Fragment } from "react"
import { Table } from "antd"
import { PaginationConfig } from "antd/es/pagination"
import { ColumnProps } from "antd/es/table"

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

const TableWindow = () => {
  return <Table columns={columns} dataSource={data} pagination={paginationOption} />
}

export default TableWindow
