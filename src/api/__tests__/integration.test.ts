import { APIGatewayProxyResult, Context } from "aws-lambda"
import { handler } from "../handler"

describe("handler", () => {
    it("should return 200 response", async () => {
        const reposne = await handler(
            {body: "{\"words\": [\"child\", \"dog\"]}"} as any,
            {} as Context,
            () => {}
        ) as APIGatewayProxyResult

        expect(reposne.statusCode).toEqual(200)
    })
})