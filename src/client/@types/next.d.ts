import { Store } from "redux"
import { AppInitialProps } from "next/app"
import { InitialState } from "../store/modules"

declare module "next" {
  interface NextPageContext {
    ctx: {
      reduxStore: Store<InitialState>
    }
  }
}

declare module "next/app" {
  interface AppInitialProps {
    reduxStore: Store<InitialState>
  }
}
