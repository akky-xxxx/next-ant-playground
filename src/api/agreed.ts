/**
 * import node_modules
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { convert } from "agreed-typed"

import getTodoList from "./services/todo/get"

const apiList = [...getTodoList]
const agrees = apiList.map((api) => convert(api)).reduce((acc, val) => acc.concat(val), [])

module.exports = agrees
