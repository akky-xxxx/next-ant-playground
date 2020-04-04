beforeAll(async () => {
  await page.goto("http://localhost:3000/condition-form")
})

afterAll(async (done) => {
  done()
})

describe("Condition Form", () => {
  it("ページが表示されること", async () => {
    await expect(page).toMatch("条件 1")
    await expect(page).toMatch("条件 2")
    await expect(page).toMatch("条件 3")
  })
})
