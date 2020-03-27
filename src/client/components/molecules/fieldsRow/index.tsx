/**
 * import node_modules
 */
import React, { FC } from "react"
import { Form, Input, Popover, Button } from "antd"
import styled from "styled-components"

/**
 * import components
 */
import FlexBlock from "../../atoms/flexBlock"

/**
 * import others
 */
import STYLE_VARIABLES from "../../../assets/styles/variables"
import ErrorMessage from "../../atoms/errorMessage"

/**
 * main
 */
interface FieldsRowProps {
  index: number
  fields: {
    isValid: boolean
    handleRemoveField: Function
    handleAddField: Function
    rowId: string
    input1: {
      inputValue: number
      handleChangeValue: Function
      errorMessage: null | string
      isInput: boolean
      isValid: boolean
      id: string
    }
    input2: {
      inputValue: number
      handleChangeValue: Function
      errorMessage: null | string
      isInput: boolean
      isValid: boolean
      id: string
    }
  }
}

const FieldsRow: FC<FieldsRowProps> = (props) => {
  const {
    index,
    fields: { input1, input2, isValid, handleAddField, handleRemoveField, rowId },
  } = props

  return (
    <StyledRow label={`条件 ${index + 1}`} colon={false}>
      <FlexBlock justifyContent="space-between">
        <FlexBlock>
          <div>
            <Popover
              content={<ErrorMessage message={input1.errorMessage} />}
              visible={input1.isInput && !input1.isValid}
              placement="bottomLeft"
            >
              <Input
                value={input1.inputValue || ""}
                onChange={(event) =>
                  input1.handleChangeValue({
                    targetId: rowId,
                    newValue: event.target.value,
                    isRequire: index === 0,
                  })
                }
              />
            </Popover>
          </div>

          <Connect>が</Connect>

          <div>
            <Popover
              content={<ErrorMessage message={input2.errorMessage} />}
              visible={input2.isInput && !input2.isValid}
              placement="bottomLeft"
            >
              <Input
                value={input2.inputValue || ""}
                onChange={(event) =>
                  input2.handleChangeValue({
                    targetId: rowId,
                    newValue: event.target.value,
                    isRequire: index === 0,
                  })
                }
              />
            </Popover>
          </div>
        </FlexBlock>

        <div>
          <FlexBlock justifyContent="space-between">
            {index !== 0 ? (
              <MinusButton shape="circle" onClick={() => handleRemoveField({ targetId: rowId })}>
                -
              </MinusButton>
            ) : (
              <span />
            )}
            <Button shape="circle" onClick={() => handleAddField({ targetId: rowId })} disabled={!isValid}>
              +
            </Button>
          </FlexBlock>
        </div>
      </FlexBlock>
    </StyledRow>
  )
}

const StyledRow = styled(Form.Item)`
  margin-bottom: 0;

  :not(:first-child) {
    margin-top: ${STYLE_VARIABLES.MARGINS.MARGIN12}px;
  }
`

const Connect = styled.span`
  margin-left: ${STYLE_VARIABLES.MARGINS.MARGIN8}px;
  margin-right: ${STYLE_VARIABLES.MARGINS.MARGIN8}px;
`

const MinusButton = styled(Button)`
  margin-right: 8px;
`

export default FieldsRow
