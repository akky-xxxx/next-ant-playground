export function createAsyncActionTypes(namespace) {
  return [`${namespace}/request`, `${namespace}/success`, `${namespace}/fail`]
}
