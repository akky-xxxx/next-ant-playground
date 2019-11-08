/**
 * import node_modules
 */
import React, { useState } from "react"
import { NextPage } from "next"
import { Button, List } from "antd"
import QueueAnim from "rc-queue-anim"
import uuid from "uuid"

/**
 * import others
 */
import { pageNameMap } from "../../shared/const/common"

/**
 * main
 */
const Top: NextPage = () => {
  const [items, changeItems] = useState([uuid(), uuid()])
  const handleAddItem = () => changeItems([...items, uuid()])
  const handleRemoveItem = (targetId: string) => changeItems(items.filter(value => value !== targetId))
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
      <QueueAnim component={List} componentProps={listProps} type={["right", "left"]} leaveReverse>
        {listItems}
      </QueueAnim>
    </div>
  )
}

Top.getInitialProps = async () => {
  return {
    currentPage: pageNameMap.todo,
  }
}

export default Top
