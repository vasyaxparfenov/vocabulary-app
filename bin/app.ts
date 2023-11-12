import "source-map-support/register"
import * as cdk from 'aws-cdk-lib'
import {ApiStack} from "../lib/api-stack"
import { UIStack } from "../lib/ui-stack"

export const stackName = "vocabulary-app-stack"

const app = new cdk.App()

const api = new ApiStack(app, stackName + "-api")

new UIStack(app, stackName + "-ui", {
    apiUrl: api.apiUrl
})
