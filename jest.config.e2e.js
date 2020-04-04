module.exports = {
  preset: "jest-puppeteer",
  testMatch: ["**/__tests__/e2e/*.ts?(x)"],
  setupFilesAfterEnv: ["./jest.setup.e2e.js"],
}
