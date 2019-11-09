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
import useFormReducer from "./useFormReducer"

const FormTest: NextPage = () => {
  const { state, handleChangeValue, handleAddField, handleRemoveField } = useFormReducer()

  return (
    <Form>
      {state.fields.map((field, index) => {
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
