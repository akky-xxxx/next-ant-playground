/**
 * import node_modules
 */
import { css } from "styled-components"

/**
 * import others
 */
import theme from "./theme"

export default css`
  @media ${theme.media.pc} {
    /* data-media属性を持ち、その属性値にpcが含まれなかったら */
    [data-media]:not([data-media~="pc"]) {
      display: none;
    }
  }

  @media ${theme.media.sp} {
    /* data-media属性を持ち、その属性値にspが含まれなかったら */
    [data-media]:not([data-media~="sp"]) {
      display: none;
    }
  }
`
