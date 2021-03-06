/**
 * import node_modules
 */
import React, { useRef, useEffect, memo, FunctionComponent } from "react"
import { Form, Button, Input, Col, Popover } from "antd"
import styled from "styled-components"

/**
 * import components
 */
import ErrorMessage from "../../atoms/errorMessage"
import FlexBlock from "../../atoms/flexBlock"

/**
 * import others
 */
import { Field, HandleActions } from "../../../store/modules/page/formTest/types"

/**
 * main
 */
interface FormRowProps extends Field, HandleActions {
  index: number
}

const FormRow: FunctionComponent<FormRowProps> = (props) => {
  const {
    id,
    inputValue,
    isInput,
    isValid,
    errorMessage,
    index,
    handleChangeValue,
    handleAddField,
    handleRemoveField,
  } = props
  const self = useRef(null)

  useEffect(() => {
    // TODO: linter が optional chaining に対応したら disable comment 削除
    /* eslint-disable no-unused-expressions,no-undef,prettier/prettier,no-restricted-globals,@typescript-eslint/ban-ts-comment */
    // @ts-ignore
    self?.current?.focus()
    /* eslint-enable no-unused-expressions,no-undef,prettier/prettier,no-restricted-globals,@typescript-eslint/ban-ts-comment */
  }, [self])

  return (
    <Form.Item>
      <FlexBlock justifyContent="space-between">
        <Col sm={21}>
          <Popover
            content={<ErrorMessage message={errorMessage} />}
            visible={isInput && !isValid}
            placement="bottomLeft"
          >
            <Input
              value={inputValue || ""}
              onChange={(event) =>
                handleChangeValue({ targetId: id, newValue: event.target.value, isRequire: index === 0 })
              }
              ref={self}
            />
          </Popover>
        </Col>
        <Col sm={3} style={{ flexBasis: 100 }}>
          <FlexBlock justifyContent="space-between">
            {index !== 0 ? (
              <MinusButton shape="circle" onClick={() => handleRemoveField({ targetId: id })}>
                -
              </MinusButton>
            ) : (
              <span />
            )}
            <Button shape="circle" onClick={() => handleAddField({ targetId: id })} disabled={!inputValue}>
              +
            </Button>
          </FlexBlock>
        </Col>
      </FlexBlock>
    </Form.Item>
  )
}

const MinusButton = styled(Button)`
  margin-right: 8px;
`

type IsNoReRender<T> = (beforeProps: T, afterProps: T) => boolean

const isNoReRender: IsNoReRender<FormRowProps> = (beforeProps, afterProps) =>
  beforeProps.inputValue === afterProps.inputValue

export default memo(FormRow, isNoReRender)
