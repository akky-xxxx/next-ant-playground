/**
 * import node_modules
 */
import { combine } from "favalid"

/**
 * import others
 */
import { validatorRequired, validatorNumber } from "./validatorRules"

/**
 * main
 */
type ValidateTypes = "number"

/**
 * バリデータを作成する
 * @param type - バリデートの種類
 * @param isRequire - 必須 / 任意
 * @param hasTargetString - 任意で未入力状態をチェックさせないため
 */
const getValidator = (type: ValidateTypes, isRequire: boolean, hasTargetString: boolean) => {
  const validateRules = []

  if (type === "number") {
    if (isRequire) validateRules.push(validatorRequired)

    if (hasTargetString) {
      validateRules.push(validatorNumber)
    }
  }

  return combine(...validateRules)
}

export default getValidator
