// TODO: productionビルド時にはSS側の環境（ポート4000番）を見るように一旦設定しておく
const axiosBaseURL = "http://localhost:3010/"

export default {
  // https://github.com/yahoo/fetchr
  fetchr: {
    clientConfig: {
      xhrPath: "/proxy",
      xhrTimeout: 1000000,
      context: {},
      contextPicker: {
        GET: [],
      },
    },
  },

  // https://github.com/axios/axios
  axios: {
    baseURL: axiosBaseURL,
    timeout: 10000,
  },
}
