import React, { useState } from "react"
import { Button, List } from "antd"
import QueueAnim from "rc-queue-anim"
import uuid from "uuid"

const Top = () => {
  const [items, changeItems] = useState([uuid(), uuid()])
  const handleAddItem = () => changeItems([...items, uuid()])
  const handleRemoveItem = targetId => changeItems(items.filter(value => value !== targetId))
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

export default Top
