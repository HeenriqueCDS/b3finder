import AWS from "aws-sdk";
import "dotenv/config";

AWS.config.update({
  region: "sa-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const sqs = new AWS.SQS({});

export const importTicker = (tickerId: string) => {
  return sqs
    .sendMessage({
      QueueUrl: process.env.AWS_QUEUE_URL,
      MessageBody: JSON.stringify({
        tickerId,
      }),
    })
    .promise();
};