import { success, failure } from "./libs/response-lib";
import * as dynamoDbLib from "./libs/dynamodb-lib";
//import AWS from "aws-sdk";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  //var transcribeservice = new AWS.TranscribeService();
  // var params = {
  //   VocabularyName: data['name']
  // };
  const params = {
    TableName: 'audio-vocabulary',
    Key: {
      vocabName: data['name']
    }
  };
  try {
    const result = await dynamoDbLib.call("get", params);
    if (result.Item) {
      // Return the retrieved item
      return success(result.Item);
    } else {
      return failure({ status: false, error: "Item not found." });
    }
  } catch (e) {
    return failure({ status: false });
  }
}
