/**
 * import node_modules
 */
import React, { useEffect } from "react"
import { NextPage } from "next"
import Head from "next/head"
import { Form } from "antd"

/**
 * import components
 */
import FormRow from "../../molecules/formRow"

/**
 * import others
 */
import { GetInitialPropsReturn } from "../../../shared/types/common"
import { HandleActions, Field } from "../../../store/modules/page/formTest/types"

/**
 * main
 */
interface FormTestProps extends HandleActions {
  fields: Field[]
}

const FormTest: NextPage<FormTestProps, GetInitialPropsReturn> = props => {
  const { handleAddField, handleChangeValue, handleRemoveField, fields, handleGetTodoList } = props

  useEffect(() => {
    handleGetTodoList()
  }, [])

  return (
    <Form>
      <Head>
        <title>form test</title>
      </Head>
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
