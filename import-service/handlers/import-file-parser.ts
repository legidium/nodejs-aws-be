import path from 'path';
import csv from "csv-parser";
import {S3, SQS} from "aws-sdk";
import {APIGatewayProxyHandler} from "aws-lambda";
import {createServerErrorResponse, createSuccessResponse, Logger} from "../../shared/utils";

const BUCKET_NAME = process.env.BUCKET_NAME;
const SQS_URL = process.env.SQS_URL;

const s3 = new S3({
    signatureVersion: 'v4',
    region: 'eu-west-1'
});

export const importFileParser: APIGatewayProxyHandler = async (event) => {
    try {
        const sqs = new SQS();
        const {Records} = event as any;
        const name = Records[0].s3.object.key;

        Logger.debug(JSON.stringify(Records[0], null, 2));

        const data = await new Promise((resolve, reject) => {
            const results = [];

            s3.getObject({Bucket: BUCKET_NAME, Key: name})
                .createReadStream()
                .pipe(csv())
                .on("data", (data) => {
                    Logger.debug("[IMPORT]", data);
                    results.push(data);
                    sqs.sendMessage(
                        {
                            QueueUrl: SQS_URL,
                            MessageBody: JSON.stringify(data)
                        },
                        (error) => {
                            Logger.debug(`${error ? "[ERROR]" : "[SUCCESS]"} Send a message for:`, data);
                        }
                    );
                })
                .on("end", () => resolve(results))
                .on("error", (error) => reject(error));
        });

       await s3.copyObject({
           Bucket: BUCKET_NAME,
           CopySource: `${BUCKET_NAME}/${name}`,
           Key: `parsed/${path.basename(name)}`
       }).promise();

        await s3.deleteObject({
            Bucket: BUCKET_NAME,
            Key: name
        }).promise();

        Logger.debug('[SUCCESS]', JSON.stringify(data, null, 2));
        return createSuccessResponse(data);
    } catch (error) {
        Logger.debug('[ERROR]', error);
        return createServerErrorResponse(error);
    }
}
