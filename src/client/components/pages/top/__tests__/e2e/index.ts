beforeAll(async () => {
  await page.goto("http://localhost:3000")
})

afterAll(async (done) => {
  done()
})

describe("Top", () => {
  it("ページが表示されること", async () => {
    await expect(page).toBeTruthy()
  })
})
