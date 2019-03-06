import { success, failure } from "./libs/response-lib";
import AWS from "aws-sdk";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  //var stepfunctions = new AWS.StepFunctions();
  // var transcribeservice = new AWS.TranscribeService();
  // var params = {
  //   stateMachineArn: 'arn:aws:states:us-east-1:741625714969:stateMachine:audio-transcribe-createVocabulary',
  //   input: "{\"list\" : \"" + data['list'] + "\"}",
  //   name: Math.round((new Date()).getTime() / 1000).toString()
  // };
  var params = {
    LanguageCode: 'en-US',
    Phrases: data['list'],
    VocabularyName: data['name']
  };
  try {
    var result = await transcribeservice.updateVocabulary(params).promise();
    //console.log(result);
    
    return success(result);
  } catch (e) {
    return failure({ status: false });
  }
}
