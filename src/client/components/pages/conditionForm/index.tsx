/**
 * import node_modules
 */
import React, { useEffect } from "react"
import { NextPage } from "next"
import { Form, Spin } from "antd"

/**
 * import components
 */
import LogicalOperationRow from "../../molecules/logicalOperationRow"
import FieldsRow from "../../molecules/fieldsRow"

/**
 * import others
 */
import { HandleActions as HandleCheckTokenActions } from "../../../store/modules/app/checkToken/types"
import { GetInitialPropsReturn } from "../../../shared/types/common"
import { InitialState as AppState } from "../../../store/modules/app"
import COLS from "../../../shared/const/grids"

/**
 * main
 */
export type HandleActions = HandleCheckTokenActions

interface ConditionFormProps extends HandleActions {
  app: AppState
}

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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleChangeValue: () => {},
  errorMessage: null,
  isInput: false,
  isValid: true,
  id: "123",
}

const input2 = {
  inputValue: 457,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleChangeValue: () => {},
  errorMessage: null,
  isInput: false,
  isValid: true,
  id: "457",
}

const fields = {
  /* eslint-disable @typescript-eslint/no-empty-function */
  handleAddField: () => {},
  handleRemoveField: () => {},
  /* eslint-enable @typescript-eslint/no-empty-function */
  isValid: false,
  rowId: "123",
  input1,
  input2,
}

const ConditionForm: NextPage<ConditionFormProps, GetInitialPropsReturn> = (props) => {
  const {
    handleCheckToken,
    app: { checkToken },
  } = props

  useEffect(() => {
    handleCheckToken()
  }, [])

  return (
    <Spin spinning={checkToken.isLoading}>
      <Form labelCol={labelCol} wrapperCol={wrapperCol}>
        {/* eslint-disable @typescript-eslint/no-empty-function */}
        <LogicalOperationRow index={0} selectedValue={1} handleChangeLogicalOperation={() => {}} />
        <FieldsRow index={0} fields={fields} />
        <LogicalOperationRow index={1} selectedValue={1} handleChangeLogicalOperation={() => {}} />
        <FieldsRow index={1} fields={fields} />
        <LogicalOperationRow index={2} selectedValue={0} handleChangeLogicalOperation={() => {}} />
        <FieldsRow index={2} fields={fields} />
        {/* eslint-enable @typescript-eslint/no-empty-function */}
      </Form>
    </Spin>
  )
}

export default ConditionForm
