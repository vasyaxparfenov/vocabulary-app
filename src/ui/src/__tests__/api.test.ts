import {analyse} from "../api"

describe("analyse()", () => {

    let mockResponse: Response;

    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockImplementation((_) => Promise.resolve(mockResponse))
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should return result report when sucessful response", async () => {
        mockResponse = {
            json: jest.fn().mockResolvedValue({
                stats: {
                    "noun": 5,
                    "verb": 3,
                    "adjective": 0,
                    "adverb": 1,
                    "preposition": 1,
                    "conjunction": 0,
                    "pronoun": 1,
                    "interjection": 0,
                    "determiner": 0,    
                    "numeral": 0
                }
            }),
            status: 200
        } as any as Response

        const resposne = await analyse(["input"])

        expect(resposne.value).toEqual("noun: 5, verb: 3, adjective: 0, adverb: 1, preposition: 1, conjunction: 0, pronoun: 1, interjection: 0, determiner: 0, numeral: 0".split(", "))})



    it.each([401, 400])("should return error message when %d response", async (statusCode: number) => {
        
        const errorMessage = "Some error message"
        
        mockResponse = {
            json: jest.fn().mockResolvedValue({
                "message": `${errorMessage}`
            }),
            status: statusCode
        } as any as Response

        const result = await analyse(["input"])

        expect(result.error).toBe(errorMessage)
    })

    it.each([500, 503])("should return generic error when %d response", async (statusCode: number) => {
        
        mockResponse = {
            status: statusCode
        } as any as Response

        const result = await analyse(["input"])

        expect(result.error).not.toBeNull()
    })

    it("should return generic error when connection can't be established", async () => {
        jest.spyOn(global, 'fetch').mockImplementation((_) => Promise.reject("Host is unavailable!"))

        const result = await analyse(["input"])

        expect(result.error).not.toBeNull()
    })

})