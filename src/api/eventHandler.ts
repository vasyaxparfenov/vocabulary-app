import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { IEventHandler, IVocabulary } from "./abstractions";

interface AnalysisRequest{
    words: string[]
}

export class EventHandler implements IEventHandler<APIGatewayProxyEvent, APIGatewayProxyResult> {
    
    constructor(private vocabulary: IVocabulary) {}

    static validationResponse(text: string): Promise<APIGatewayProxyResult>{
        return Promise.resolve({
            statusCode: 400,
            body: JSON.stringify({
                message: `ValidationError: ${text}`
            }) 
        })
    }

    public async handle(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        
        if(!event.body){
            return EventHandler.validationResponse("Request body is empty")
        }

        const request = JSON.parse(event.body) as AnalysisRequest

        if(request.words.length == 0){
            return EventHandler.validationResponse("Please provide ")
        }

        const stats = await this.vocabulary.analyse(request.words);

        return Promise.resolve({
            statusCode: 200,
            body: JSON.stringify({
                stats: stats
            }) 
        })
    }
}