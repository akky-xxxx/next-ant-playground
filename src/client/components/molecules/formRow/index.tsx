/**
 * import node_modules
 */
import React, { useRef, useEffect, FunctionComponent } from "react"
import { Form, Button, Input, Row, Col } from "antd"
import styled from "styled-components"

/**
 * import others
 */
import { Field } from "../../pages/formTest/useFormReducer"

/**
 * main
 */
interface FormRowProps extends Field {
  index: number
  handleChangeValue: Function
  handleAddField: Function
  handleRemoveField: Function
}

const FormRow: FunctionComponent<FormRowProps> = props => {
  const { id, inputValue, index, handleChangeValue, handleAddField, handleRemoveField } = props
  const self = useRef(null)

  useEffect(() => {
    if (self && self.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      self.current.focus()
    }
  })

  return (
    <Form.Item>
      <Row type="flex" justify="space-between">
        <Col sm={21}>
          <Input
            value={inputValue || ""}
            onChange={event => handleChangeValue(id, event.target.value, index === 0)}
            ref={self}
          />
        </Col>
        <Col sm={3} style={{ flexBasis: 100 }}>
          <Row type="flex" justify="space-between">
            {index !== 0 ? (
              <MinusButton shape="circle" onClick={() => handleRemoveField(id)}>
                -
              </MinusButton>
            ) : (
              <span />
            )}
            <Button shape="circle" onClick={() => handleAddField()}>
              +
            </Button>
          </Row>
        </Col>
      </Row>
    </Form.Item>
  )
}

const MinusButton = styled(Button)`
  margin-right: 8px;
`

export default FormRow
