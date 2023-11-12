import { IEventHandler } from "./abstractions";
import { APIGatewayEvent, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export class LoggingEventHandler implements IEventHandler<APIGatewayEvent, APIGatewayProxyResult>{
    
    constructor(private internal: IEventHandler<APIGatewayEvent, APIGatewayProxyResult>) {}

    static unhandeledErrorResponse(): Promise<APIGatewayProxyResult>{
        return Promise.resolve({
            statusCode: 500,
            body: "Internal Server Error",
        })
    }

    async handle(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        try{
            console.log("Handling event")
            const result = await this.internal.handle(event);
            console.log(`Handled event with status ${result.statusCode}`)
            return result;
        } catch(e){
            console.error("Unhandeled exception:", e);
            return LoggingEventHandler.unhandeledErrorResponse()
        }
    }
}