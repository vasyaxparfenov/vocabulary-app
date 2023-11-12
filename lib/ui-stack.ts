import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { CloudFrontAllowedMethods, CloudFrontWebDistribution, OriginAccessIdentity, OriginProtocolPolicy } from "aws-cdk-lib/aws-cloudfront";
import { Bucket, BucketAccessControl } from "aws-cdk-lib/aws-s3"
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs"


interface UIStackProps extends StackProps {
    apiUrl: string
}

export class UIStack extends Stack {

    constructor(scope: Construct, stackName: string, props: UIStackProps) {
        super(scope, stackName, props)

        const bucket = new Bucket(this, this.stackName + "Bucket", {
            accessControl: BucketAccessControl.PRIVATE
        })

        new BucketDeployment(this, this.stackName + "Deployment", {
            destinationBucket: bucket,
            sources: [Source.asset("./src/ui/build")]
        })

        const originAccessIdentity = new OriginAccessIdentity(this, stackName+'OriginAccessIdentity');

        bucket.grantRead(originAccessIdentity)

        console.log(props.apiUrl)

        const hostname = props.apiUrl.split("://")[1].split("/")[0]
        const pathname = props.apiUrl.split("://")[1].split("/")[1]

        console.log(hostname)
        console.log(pathname)

        const distribution = new CloudFrontWebDistribution(this, stackName + "Distribution", {
            originConfigs : [
                {
                    s3OriginSource: {
                        s3BucketSource: bucket,
                        originAccessIdentity: originAccessIdentity,
                    },
                    behaviors: [{isDefaultBehavior: true}]
                },
                {
                    customOriginSource: {
                        domainName: hostname,
                        originPath: `/${pathname}`,
                        originProtocolPolicy: OriginProtocolPolicy.HTTPS_ONLY                        
                    },
                    behaviors: [{
                        pathPattern: "/api/*",
                        allowedMethods: CloudFrontAllowedMethods.ALL
                    }]
                }
            ],
            defaultRootObject: "index.html"
        })

        new CfnOutput(this, "AppUrl", {value: `https://${distribution.distributionDomainName}`})
    }
}