/**
 * import components
 */
import FormTest from "../../components/pages/formTest"

/**
 * import others
 */
import { pageNameMap } from "../../shared/const/common"

FormTest.getInitialProps = async () => {
  return {
    currentPage: pageNameMap.formTest,
  }
}

export default FormTest
