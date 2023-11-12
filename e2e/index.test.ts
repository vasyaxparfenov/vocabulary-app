const url = process.env.APP_URL!

describe("main flow", () => {
    beforeAll(async () => {
        await page.goto(url)
    })

    it("should return valid analysis when passed words", async () => {
       await page.type("textarea", "cat happy the")

       await page.click("button")

       await page.waitForTimeout(1000)

       const output = (await page.$$(".Output"))[0]

       const paragraphs = await output.$$("p")

       const expected = ["noun: 1", "adjective: 1", "determiner: 1"]

       const actual: string[] = []

       for(let p of paragraphs){
            const text = await p.evaluate(e => e.innerText) as string
            actual.push(text)
       }

       expect(expected).toEqual(actual)
    })
})