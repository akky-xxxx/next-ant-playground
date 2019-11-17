/**
 * import node_modules
 */
import React from "react"
import { NextPage } from "next"
import { Form } from "antd"

/**
 * import components
 */
import LogicalOperationRow from "../../molecules/logicalOperationRow"
import FieldsRow from "../../molecules/fieldsRow"

/**
 * import others
 */
import { GetInitialPropsReturn } from "../../../shared/types/common"
import COLS from "../../../shared/const/grids"

/**
 * main
 */
const labelCol = {
  sm: {
    span: COLS.COL2_SM_LEFT,
  },
}
const wrapperCol = {
  sm: {
    span: COLS.COLS_SM_RIGHT,
  },
}

const input1 = {
  inputValue: 123,
  handleChangeValue: () => {},
  errorMessage: null,
  isInput: false,
  isValid: true,
  id: "123",
}

const input2 = {
  inputValue: 457,
  handleChangeValue: () => {},
  errorMessage: null,
  isInput: false,
  isValid: true,
  id: "457",
}

const fields = {
  handleAddField: () => {},
  handleRemoveField: () => {},
  isValid: false,
  rowId: "123",
  input1,
  input2,
}

const ConditionForm: NextPage<{}, GetInitialPropsReturn> = () => {
  return (
    <Form labelCol={labelCol} wrapperCol={wrapperCol}>
      <LogicalOperationRow index={0} selectedValue={1} handleChangeLogicalOperation={() => {}} />
      <FieldsRow index={0} fields={fields} />
      <LogicalOperationRow index={1} selectedValue={1} handleChangeLogicalOperation={() => {}} />
      <FieldsRow index={1} fields={fields} />
      <LogicalOperationRow index={2} selectedValue={0} handleChangeLogicalOperation={() => {}} />
      <FieldsRow index={2} fields={fields} />
    </Form>
  )
}

export default ConditionForm
