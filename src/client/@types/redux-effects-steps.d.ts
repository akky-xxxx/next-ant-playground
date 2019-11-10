declare module "redux-effects-steps" {
  type MaybePromise<T> = T | Promise<T>
  function steps(
    o: MaybePromise<Record<string, unknown>> | MaybePromise<Record<string, unknown>>[],
    ...rest: (
      | [(f: unknown) => MaybePromise<Record<string, unknown>>, (e: Error) => MaybePromise<Record<string, unknown>>]
      | [(f: unknown) => MaybePromise<Record<string, unknown>>]
      | [MaybePromise<Record<string, unknown>>]
      | MaybePromise<Record<string, unknown>>)[]
  ): Promise<unknown>
}
