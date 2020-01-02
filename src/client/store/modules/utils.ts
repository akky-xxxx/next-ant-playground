export function createAsyncActionTypes(namespace: string) {
  return [`${namespace}/request`, `${namespace}/success`, `${namespace}/fail`]
}
