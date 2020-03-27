import React, { Fragment } from "react"
import Document, { Head, Main, NextScript, DocumentContext } from "next/document"
import { ServerStyleSheet } from "styled-components"
import { clone } from "remeda"

export default class MyDocument extends Document {
  static async getInitialProps(context: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = clone(context.renderPage)
    const newContext = clone(context)
    try {
      newContext.renderPage = () =>
        originalRenderPage({
          // eslint-disable-next-line react/jsx-props-no-spreading
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })
      const initialProps = await Document.getInitialProps(newContext)
      return {
        ...initialProps,
        styles: (
          <Fragment>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </Fragment>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render(): JSX.Element {
    return (
      <html lang="ja">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" key="viewport" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
