import { required, tester } from "favalid"

export const validatorRequired = required(() => "このフィールドを入力してください。")
export const validatorNumber = tester((value: string) => /^[\d]+$/.test(value), () => "数字で入力してください")
