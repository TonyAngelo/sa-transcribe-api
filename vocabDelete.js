import { success, failure } from "./libs/response-lib";
import AWS from "aws-sdk";
import * as dynamoDbLib from "./libs/dynamodb-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  //var transcribeservice = new AWS.TranscribeService();
  // var params = {
  //   VocabularyName: data['name']
  // };
  const params = {
    TableName: 'audio-vocabulary',
    Key:{
      vocabName: data['name'],
    }
  };
  try {
    //var result = await transcribeservice.deleteVocabulary(params).promise();
    //console.log(result);
    var result = await dynamoDbLib.call("delete", params);
    console.log('success');
    console.log(result);
    //return success(params.Item);
    
    return success(result);
  } catch (e) {
    return failure({ status: false });
  }
}
