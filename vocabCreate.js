import { success, failure } from "./libs/response-lib";
import AWS from "aws-sdk";
import * as dynamoDbLib from "./libs/dynamodb-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  // var stepfunctions = new AWS.StepFunctions();
  // var params = {
  //   stateMachineArn: 'arn:aws:states:us-east-1:741625714969:stateMachine:audio-transcribe-createVocabulary',
  //   input: "{\"rss\" : \"" + data['rss'] + "\"}",
  //   name: Math.round((new Date()).getTime() / 1000).toString()
  // };
  const params = {
    TableName: 'audio-vocabulary',
    Item: {
      vocabName: data['name'],
      vocab: data['vocab']
    }
  };
  
  try {
    //var result = await stepfunctions.startExecution(params).promise();
    //console.log(result);
    await dynamoDbLib.call("put", params);
    console.log('success');
    console.log(params.Item);
    return success(params.Item);
    
    //return success(result);
  } catch (e) {
    return failure({ status: false });
  }
}
