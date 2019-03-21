import { success, failure } from "./libs/response-lib";
import AWS from "aws-sdk";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  // var stepfunctions = new AWS.StepFunctions();
  // var params = {
  //   stateMachineArn: 'arn:aws:states:us-east-1:741625714969:stateMachine:audio-transcribe-createVocabulary',
  //   input: "{\"rss\" : \"" + data['rss'] + "\"}",
  //   name: Math.round((new Date()).getTime() / 1000).toString()
  // };
  var lambda = new AWS.Lambda();
  // create JSON object for parameters for invoking Lambda function
  var params = {
    FunctionName: 'audio-transcribe-backend-getRSSVocab', // the lambda function we are going to invoke
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: '{ "rss" : "' + data['rss'] + '" }'
  };
  try {
    var result = await lambda.invoke(params).promise();
    //var result = 'test';
    console.log(result);
    
    return success(result);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
