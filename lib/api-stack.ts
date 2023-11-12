import { AuthorizationType, LambdaIntegration, MethodLoggingLevel, RestApi } from "aws-cdk-lib/aws-apigateway"
import { Function, Runtime, AssetCode } from "aws-cdk-lib/aws-lambda"
import { Duration, Stack, StackProps } from "aws-cdk-lib"
import { Construct } from "constructs"


export class ApiStack extends Stack {
    public readonly apiUrl: string
    
    constructor(scope: Construct, id: string) {
        super(scope, id)

        const restApi = new RestApi(this, this.stackName + "-gateway", {
            deployOptions: {
                stageName: "beta",
                metricsEnabled: true,
                loggingLevel: MethodLoggingLevel.INFO,
                dataTraceEnabled: true,
            },
        })

        const functionName = this.stackName + "-function"

        const lambdaFunction = new Function(this, functionName, {
            functionName: functionName,
            handler: "handler.handler",
            runtime: Runtime.NODEJS_18_X,
            code: new AssetCode(`./src/api/.out`),
            memorySize: 128,
            timeout: Duration.seconds(10)
        })

        restApi.root
            .addResource("api")
            .addResource("analyse")
            .addMethod("POST", new LambdaIntegration(lambdaFunction, {
            }), {
                authorizationType: AuthorizationType.NONE
            })

        this.apiUrl = restApi.url
    }
}