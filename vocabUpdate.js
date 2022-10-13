import { success, failure } from "./libs/response-lib";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import AWS from "aws-sdk";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const dbParams = {
    TableName: 'audio-vocabulary',
    Key: {
        'vocabName': data['name']
    },
    UpdateExpression: "set vocab = :val1",
    ExpressionAttributeValues: {
      ':val1': JSON.stringify(data['list'])
    }
  };
  try {

    var dbresult = await dynamodb.update(dbParams).promise();
    console.log('success');
    console.log(dbresult);
    
    return success(dbresult);
  } catch (e) {
    console.log(e)
    return failure({ status: false });
  }
}
