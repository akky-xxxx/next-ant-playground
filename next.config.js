const withCss = require("@zeit/next-css")
const withPlugins = require("next-compose-plugins")

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/
      const antMobileStyles = /antd-mobile\/.*?\/style\/css.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (antStyles.test(request) || antMobileStyles.test(request)) return callback()
          if (typeof origExternals[0] === "function") {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === "function" ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: "null-loader",
      })
      config.module.rules.unshift({
        test: antMobileStyles,
        use: "null-loader",
      })
    }
    return config
  },
}

module.exports = withPlugins([[withCss]], nextConfig)
