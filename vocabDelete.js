import { success, failure } from "./libs/response-lib";
import AWS from "aws-sdk";
import * as dynamoDbLib from "./libs/dynamodb-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'audio-vocabulary',
    Key:{
      vocabName: data['name'],
    }
  };
  try {
    var result = await dynamoDbLib.call("delete", params);
    console.log('success');
    console.log(result);
    return success(result);
  } catch (e) {
    return failure({ status: false });
  }
}
