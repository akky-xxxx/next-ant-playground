import { Action, ActionFunctionAny } from "redux-actions"

declare module "redux-effects-steps" {
  type MaybePromise<T> = T | Promise<T>
  function steps(
    // ActionFunctionAny<Action<any>> は createAction の戻り値の型と同じ
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    o: ActionFunctionAny<Action<any>> | MaybePromise<Record<string, unknown>> | MaybePromise<Record<string, unknown>>[],
    ...rest: (
      | [(f: unknown) => MaybePromise<Record<string, unknown>>, (e: Error) => MaybePromise<Record<string, unknown>>]
      | [(f: unknown) => MaybePromise<Record<string, unknown>>]
      | [MaybePromise<Record<string, unknown>>]
      | MaybePromise<Record<string, unknown>>
    )[]
  ): Promise<unknown>
}
