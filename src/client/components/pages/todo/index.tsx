/**
 * import node_modules
 */
import React, { useState, useEffect } from "react"
import { NextPage } from "next"
import Head from "next/head"
import { Button, List, Spin } from "antd"
import QueueAnim from "rc-queue-anim"
import { v4 as uuid } from "uuid"

/**
 * import others
 */
import { GetInitialPropsReturn } from "../../../shared/types/common"
import { HandleActions as HandleTodoActions, InitialState as TodoState } from "../../../store/modules/page/todo/types"
import { HandleActions as HandleCheckTokenActions } from "../../../store/modules/app/checkToken/types"
import { InitialState as AppState } from "../../../store/modules/app"
import isDev from "../../../shared/utils/isDev"

/**
 * main
 */
export interface HandleActions extends HandleTodoActions, HandleCheckTokenActions {}

interface TodoProps extends HandleActions {
  app: AppState
  todo: TodoState
}

const Todo: NextPage<TodoProps, GetInitialPropsReturn> = (props) => {
  const [items, changeItems] = useState<string[]>([])
  const handleAddItem = () => changeItems([...items, uuid()])
  const handleRemoveItem = (targetId: string) => changeItems(items.filter((value) => value !== targetId))

  const {
    handleGetTodoList,
    handleCheckToken,
    app: { checkToken },
    todo: { master },
  } = props

  useEffect(() => {
    if (!isDev) handleCheckToken()
    handleGetTodoList()
  }, [])

  const listItems = items.map((value) => (
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
    <Spin spinning={checkToken.isLoading || master.isLoading}>
      <Head>
        <title>todo list</title>
      </Head>
      <QueueAnim component={List} componentProps={listProps} type={["right", "left"]} leaveReverse>
        <ul>{listItems}</ul>
      </QueueAnim>
    </Spin>
  )
}

export default Todo
