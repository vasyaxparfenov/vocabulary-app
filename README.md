# Vocabulary App

This is application for learning modern full stack development tools (React + NodeJS + AWS CDK)

## Project structure

- ### bin
  - [app](./bin/app.ts) - **CDK entrypoint**
- ### lib
  - [api-stack](./lib/api-stack.ts) - **CDK stack for deploying api resources**
  - [ui-stack](./lib/ui-stack.ts) - **CDK stack for deploying ui**
- ### src
  - [ui](./src/ui/src/index.tsx) - **React application source code**
  - [api](./src/api/handler.ts) - **Lambda API source code**

## Build

To build application and run unit and integration test you need to execute following command **from the root of repository**.

```console
npm run build
```

## Deploy

To deploy application you need to run following commands **from the root of repository**.

```console
cdk deploy --all
```

**If this is first time you want to deploy application, you first need to run following command for CDK to create all neccessary resources**

```console
cdk bootstrap
```

## E2E Test

To run e2e test you need to copy url provided in output of deploy process and run following command.

```console
APP_URL=<url_from_output_of_cdk_deploy> npm run e2e
```

## Destroy

To destroy application resources you need to run following commands **from the root of repository**.

```console
cdk destroy --all
```
