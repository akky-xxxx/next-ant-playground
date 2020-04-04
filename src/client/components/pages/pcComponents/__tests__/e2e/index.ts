beforeAll(async () => {
  await page.goto("http://localhost:3000/pc-components")
})

afterAll(async (done) => {
  done()
})

describe("Pc Components", () => {
  it("ページが表示されること", async () => {
    await expect(page).toMatch("pc components")
    await expect(page).toMatch("DatePicker")
    await expect(page).toMatch("Select")
  })
})
