/**
 * import node_modules
 */
import React, { FC } from "react"
import { Row, Col, Select } from "antd"
import styled from "styled-components"

/**
 * import others
 */
import STYLE_VARIABLES from "../../../assets/styles/variables"
import COLS from "../../../shared/const/grids"

/**
 * main
 */
enum LOGICAL_OPERATION {
  AND = "0",
  OR = "1",
}

interface LogicalOperationRowProps {
  index: number
  selectedValue: number
  handleChangeLogicalOperation: Function
}

const { Option } = Select

const LogicalOperationRow: FC<LogicalOperationRowProps> = props => {
  const { index, selectedValue, handleChangeLogicalOperation } = props

  if (index === 0) return null

  return (
    <StyledRow>
      <Col sm={COLS.COLS_SM_RIGHT} offset={COLS.COL2_SM_LEFT}>
        <StyledSelectWrapper>
          <StyledSelect
            defaultValue={selectedValue.toString()}
            onChange={newValue => handleChangeLogicalOperation({ newValue })}
          >
            <Option key={LOGICAL_OPERATION.AND} value={LOGICAL_OPERATION.AND}>
              AND
            </Option>
            <Option key={LOGICAL_OPERATION.OR} value={LOGICAL_OPERATION.OR}>
              OR
            </Option>
          </StyledSelect>
        </StyledSelectWrapper>
      </Col>
    </StyledRow>
  )
}

const StyledRow = styled(Row)`
  :not(:first-child) {
    margin-top: ${STYLE_VARIABLES.MARGINS.MARGIN12}px;
  }
`

const StyledSelectWrapper = styled.div`
  width: 70px;
`

const StyledSelect = styled(Select)`
  width: 70px;
`

export default LogicalOperationRow
