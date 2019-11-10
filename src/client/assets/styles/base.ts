/**
 * import node_modules
 */
import { css } from "styled-components"

/**
 * import others
 */
import STYLE_VARIABLES from "./variables"

const { MEDIA_QUERIES } = STYLE_VARIABLES

export default css`
  @media ${MEDIA_QUERIES.PC} {
    /* data-media属性を持ち、その属性値にpcが含まれなかったら */
    [data-media]:not([data-media~="pc"]) {
      display: none;
    }
  }

  @media ${MEDIA_QUERIES.TB} {
    /* data-media属性を持ち、その属性値にtbが含まれなかったら */
    [data-media]:not([data-media~="tb"]) {
      display: none;
    }
  }
`
