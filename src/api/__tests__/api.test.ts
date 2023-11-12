import { EventHandler } from "../eventHandler"
import { LoggingEventHandler } from "../loggingEventHandler"

describe("api tests", () => {
    
    describe("eventHandler", () => {
        it("should return 400 error when empty body", async () => {
            const request = {
                body: ""
            } as any

            const sut = new EventHandler({
                analyse: jest.fn()
            })

            const response = await sut.handle(request);
            
            expect(response.statusCode).toEqual(400)
            expect(response.body).toContain("message")
        })

        it("should return 200 and stats when passed valid body", async () => {
            const request = {
                body: "{\"words\":[\"whatevet\"]}"
            } as any

            const expected = {noun: 1, verb: 2}

            const sut = new EventHandler({
                analyse: jest.fn().mockResolvedValue(expected)
            })

            const response = await sut.handle(request);

            expect(response.body).toEqual(JSON.stringify({stats: expected}))
        })
    })

    describe("loggingEventHandler", () => {
        it("should return 500 error when inner handler throws exception", async () => {
            
            
            const sut = new LoggingEventHandler({
                handle: jest.fn().mockRejectedValue(new Error())
            })

            const response = await sut.handle({} as any);
            
            expect(response.statusCode).toEqual(500)
        })

    })

    describe("staticVocabulary", () => {
        it("should return valid results", async () => {

            jest.mock('../vocabulary.json', ()=> ({
                noun: ["a", "b", "c"],
                verb: ["d", "e", "f"]
              }), { virtual: true })

            var { StaticVocabulary } = require("../vocabulary")
    
            const sut = new StaticVocabulary();

            const result = await sut.analyse(["a", "b", "f", "l"])

            expect(result).toEqual({
                noun: 2,
                verb: 1
            })
        })
    })

})