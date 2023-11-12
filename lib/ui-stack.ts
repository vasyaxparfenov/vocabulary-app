import { CfnOutput, Duration, Fn, Stack, StackProps } from "aws-cdk-lib";
import { AllowedMethods, CachePolicy, CloudFrontAllowedMethods, CloudFrontWebDistribution, Distribution, OriginAccessIdentity, OriginProtocolPolicy, OriginSslPolicy } from "aws-cdk-lib/aws-cloudfront";
import { HttpOrigin, S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Bucket, BucketAccessControl } from "aws-cdk-lib/aws-s3"
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs"


interface UIStackProps extends StackProps {
    apiUrl: string
}

export class UIStack extends Stack {

    constructor(scope: Construct, stackName: string, props: UIStackProps) {
        super(scope, stackName, props)

        const bucket = new Bucket(this, this.stackName + "-bucket", {
            accessControl: BucketAccessControl.PRIVATE,
            versioned: true
        })

        new BucketDeployment(this, this.stackName + "-deployment", {
            destinationBucket: bucket,
            sources: [Source.asset("./src/ui/build")]
        })

        const originAccessIdentity = new OriginAccessIdentity(this, stackName+'-origin-access-identity');

        bucket.grantRead(originAccessIdentity)

        const hostname = props.apiUrl.split("://")[1].split("/")[0]
        const pathname = props.apiUrl.split("://")[1].split("/")[1]

        const noCachePolicy = new CachePolicy(this, stackName + "-cache-policy", {
            maxTtl: Duration.seconds(0),
            defaultTtl: Duration.seconds(0)
        })

        const staticFilesOrigin = new S3Origin(bucket, {
            originAccessIdentity: originAccessIdentity
        })

        const distribution = new Distribution(this, stackName + "-distribution", {
            defaultBehavior: {
                origin: staticFilesOrigin
            },
            additionalBehaviors: {
                "index.html": { 
                    origin: staticFilesOrigin,
                    cachePolicy: noCachePolicy
                },
                "/api/*" : {
                    origin: new HttpOrigin(hostname, {
                        originPath: `/${pathname}`,
                        protocolPolicy: OriginProtocolPolicy.HTTPS_ONLY
                    }),
                    allowedMethods: AllowedMethods.ALLOW_ALL
                }
            },
            defaultRootObject: "index.html"
        })

        new CfnOutput(this, "AppUrl", {value: `https://${distribution.distributionDomainName}`})
    }
}