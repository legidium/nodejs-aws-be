import {S3} from "aws-sdk";
import {APIGatewayProxyHandler} from "aws-lambda";
import {createResponse, createServerErrorResponse, createSuccessResponse} from "../../shared/utils";

const BUCKET_NAME = process.env.BUCKET_NAME;
const EXPIRATION = 60 * 5;

const s3 = new S3({
    signatureVersion: 'v4',
    region: 'eu-west-1'
});

export const importProductsFile: APIGatewayProxyHandler = async (event) => {
    const {queryStringParameters} = event;
    const {name} = queryStringParameters || {};

    if (!name) {
        return createResponse(400, {
            error: "Bad request",
            message: "The name params is empty or missing"
        });
    }

    try {
        const url = await s3.getSignedUrlPromise("putObject", {
            Bucket: BUCKET_NAME,
            Key: `uploaded/${name}`,
            Expires: EXPIRATION,
            ContentType: 'text/csv'
        });
        return createSuccessResponse(url);
    } catch (error) {
        return createServerErrorResponse(error);
    }
}
