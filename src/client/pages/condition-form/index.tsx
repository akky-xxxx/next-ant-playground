/**
 * import components
 */
import ConditionForm from "../../components/pages/conditionForm"

/**
 * import others
 */
import { pageNameMap } from "../../shared/const/common"

/**
 * main
 */
ConditionForm.getInitialProps = async () => {
  return {
    currentPage: pageNameMap.conditionForm,
  }
}

export default ConditionForm
