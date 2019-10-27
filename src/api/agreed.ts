/**
 * import node_modules
 */
import { convert } from "agreed-typed"

import getTodoList from "./services/todo/get"

const apiList = [...getTodoList]
const agrees = apiList.map(api => convert(api)).reduce((acc, val) => acc.concat(val), [])

module.exports = agrees
