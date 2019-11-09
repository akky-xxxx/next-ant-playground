import React, { FunctionComponent } from "react"
import styled from "styled-components"

interface ErrorMessageProps {
  message: null | string
}

const ErrorMessage: FunctionComponent<ErrorMessageProps> = props => {
  const { message } = props

  if (!message) return null
  return <ErrorMessageStyle>{message}</ErrorMessageStyle>
}

const ErrorMessageStyle = styled.span`
  color: red;
`

export default ErrorMessage
