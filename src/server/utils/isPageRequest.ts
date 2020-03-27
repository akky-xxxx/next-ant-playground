type IsPageRequest = (url: string) => boolean
const isPageRequest: IsPageRequest = (url) => {
  const isAssetsRequest = url.includes("static")
  const isProxyRequest = url.includes("proxy")
  return !isAssetsRequest && !isProxyRequest
}

export default isPageRequest
