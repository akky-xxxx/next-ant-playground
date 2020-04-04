module.exports = {
  server: {
    command: "BROWSER=none yarn dev",
    port: 3000,
    launchTimeout: 120000,
  },
  launch: {
    headless: true,
    devtools: false,
  },
}
