import { success, failure } from "./libs/response-lib";
import AWS from "aws-sdk";

export async function main(event, context) {
  const data = JSON.parse(event.body);
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
    console.log(result);
    
    return success(result);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
