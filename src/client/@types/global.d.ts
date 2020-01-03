import { compose, Store } from "redux"

declare global {
  export interface Window {
    // eslint-disable-next-line no-undef
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    __NEXT_REDUX_STORE__: Store
  }
}
