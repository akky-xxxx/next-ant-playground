/**
 * import node_modules
 */
import React, { useState, useEffect } from "react"
import { NextPage } from "next"
import Head from "next/head"
import { Button, List } from "antd"
import QueueAnim from "rc-queue-anim"
import uuid from "uuid"

/**
 * import others
 */
import { GetInitialPropsReturn } from "../../../shared/types/common"
import { HandleActions } from "../../../store/modules/page/todo/types"

/**
 * main
 */
const Todo: NextPage<HandleActions, GetInitialPropsReturn> = props => {
  const [items, changeItems] = useState([uuid(), uuid()])
  const handleAddItem = () => changeItems([...items, uuid()])
  const handleRemoveItem = (targetId: string) => changeItems(items.filter(value => value !== targetId))

  const { handleGetTodoList } = props

  useEffect(() => {
    handleGetTodoList()
  }, [])

  const listItems = items.map(value => (
    <List.Item onClick={() => handleRemoveItem(value)} key={value}>
      {value}
    </List.Item>
  ))

  const listProps = {
    bordered: true,
    footer: (
      <Button type="primary" onClick={() => handleAddItem()}>
        追加
      </Button>
    ),
  }

  return (
    <div>
      <Head>
        <title>todo list</title>
      </Head>
      <QueueAnim component={List} componentProps={listProps} type={["right", "left"]} leaveReverse>
        {listItems}
      </QueueAnim>
    </div>
  )
}

export default Todo