beforeAll(async () => {
  await page.goto("http://localhost:3000/ant-table")
})

afterAll(async (done) => {
  done()
})

describe("Sp Components", () => {
  it("ページが表示されること", async () => {
    await expect(page).toMatch("Name")
    await expect(page).toMatch("Sex")
  })
})
