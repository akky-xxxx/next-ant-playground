/**
 * import node_modules
 */
import styled from "styled-components"

/**
 * main
 */
type JustifyContent = "space-between"

interface FlexBlockProps {
  justifyContent?: JustifyContent
}

const FlexBlock = styled.div<FlexBlockProps>`
  display: flex;
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent};`}
`

export default FlexBlock
