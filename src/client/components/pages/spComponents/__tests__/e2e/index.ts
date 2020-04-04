beforeAll(async () => {
  await page.goto("http://localhost:3000/sp-components")
})

afterAll(async (done) => {
  done()
})

describe("Sp Components", () => {
  it("ページが表示されること", async () => {
    await expect(page).toMatch("sp components")
    await expect(page).toMatch("DatePicker")
  })
})
