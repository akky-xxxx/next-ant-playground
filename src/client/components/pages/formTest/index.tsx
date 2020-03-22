/**
 * import node_modules
 */
import React, { useEffect } from "react"
import { NextPage } from "next"
import Head from "next/head"
import { Form, Spin } from "antd"

/**
 * import components
 */
import FormRow from "../../molecules/formRow"

/**
 * import others
 */
import { GetInitialPropsReturn } from "../../../shared/types/common"
import {
  HandleActions as HandleFormTestActions,
  InitialState as FormTestState,
} from "../../../store/modules/page/formTest/types"
import { HandleActions as HandleCheckTokenActions } from "../../../store/modules/app/checkToken/types"
import { InitialState as AppState } from "../../../store/modules/app"
import isDev from "../../../shared/utils/isDev"

/**
 * main
 */
export interface HandleActions extends HandleCheckTokenActions, HandleFormTestActions {}

interface FormTestProps extends HandleActions {
  app: AppState
  formTest: FormTestState
}

const FormTest: NextPage<FormTestProps, GetInitialPropsReturn> = props => {
  const {
    handleAddField,
    handleChangeValue,
    handleRemoveField,
    handleCheckToken,
    formTest,
    app: { checkToken },
  } = props
  const { fields } = formTest

  useEffect(() => {
    if (!isDev) handleCheckToken()
  }, [])

  return (
    <Spin spinning={checkToken.isLoading}>
      <Head>
        <title>form test</title>
      </Head>

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
    </Spin>
  )
}

export default FormTest
