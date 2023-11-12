import { APIGatewayProxyHandler } from "aws-lambda";
import { EventHandler } from "./eventHandler";
import { LoggingEventHandler } from "./loggingEventHandler";
import { StaticVocabulary } from "./vocabulary"

const vocabulary = new StaticVocabulary();
const eventHandler = new EventHandler(vocabulary)
const loggingEventHandler = new LoggingEventHandler(eventHandler);

export const handler: APIGatewayProxyHandler = (event, _) => loggingEventHandler.handle(event)