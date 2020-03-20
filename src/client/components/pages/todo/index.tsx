/**
 * import node_modules
 */
import React, { useState, useEffect } from "react"
import { NextPage } from "next"
import Head from "next/head"
import { Button, List } from "antd"
import QueueAnim from "rc-queue-anim"
import { v4 as uuid } from "uuid"

/**
 * import others
 */
import { GetInitialPropsReturn } from "../../../shared/types/common"
import { HandleActions as HandleTodoActions } from "../../../store/modules/page/todo/types"
import { HandleActions as HandleCheckTokenActions } from "../../../store/modules/app/checkToken/types"

/**
 * main
 */
export interface HandleActions extends HandleTodoActions, HandleCheckTokenActions {}

const Todo: NextPage<HandleActions, GetInitialPropsReturn> = props => {
  const [items, changeItems] = useState<string[]>([])
  const handleAddItem = () => changeItems([...items, uuid()])
  const handleRemoveItem = (targetId: string) => changeItems(items.filter(value => value !== targetId))

  const { handleGetTodoList, handleCheckToken } = props

  useEffect(() => {
    handleGetTodoList()
    handleCheckToken()
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
        <ul>{listItems}</ul>
      </QueueAnim>
    </div>
  )
}

export default Todo
