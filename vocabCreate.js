import { success, failure } from "./libs/response-lib";
import AWS from "aws-sdk";
import * as dynamoDbLib from "./libs/dynamodb-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'audio-vocabulary',
    Item: {
      vocabName: data['name'],
      vocab: JSON.stringify(data['vocab'])
    }
  };
  
  try {
    await dynamoDbLib.call("put", params);
    console.log('success');
    console.log(params.Item);
    return success(params.Item);
    
  } catch (e) {
    return failure({ status: false });
  }
}
