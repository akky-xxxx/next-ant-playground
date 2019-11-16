/**
 * import node_modules
 */
import React from "react"
import { NextPage } from "next"
import { Form } from "antd"

/**
 * import components
 */
import FormRow from "../../molecules/formRow"

/**
 * import others
 */
import { GetInitialPropsReturn } from "../../../shared/types/common"
import { HandleAddField, HandleChangeValue, HandleRemoveField, Field } from "../../../store/modules/page/todo"

/**
 * main
 */
interface FormTestProps {
  handleAddField: HandleAddField
  handleChangeValue: HandleChangeValue
  handleRemoveField: HandleRemoveField
  fields: Field[]
}

const FormTest: NextPage<FormTestProps, GetInitialPropsReturn> = props => {
  const { handleAddField, handleChangeValue, handleRemoveField, fields } = props

  return (
    <Form>
      {fields.map((field, index) => {
        const { id, inputValue, isInput, isValid, errorMessage } = field

        return (
          <FormRow
            key={id}
            id={id}
            inputValue={inputValue}
            isInput={isInput}
            isValid={isValid}
            errorMessage={errorMessage}
            handleChangeValue={handleChangeValue}
            handleAddField={handleAddField}
            handleRemoveField={handleRemoveField}
            index={index}
          />
        )
      })}
    </Form>
  )
}

export default FormTest
