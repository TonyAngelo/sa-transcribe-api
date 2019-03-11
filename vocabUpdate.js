import { success, failure } from "./libs/response-lib";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import AWS from "aws-sdk";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  var transcribeservice = new AWS.TranscribeService();
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  //return dynamoDb[action](params).promise();
  //var stepfunctions = new AWS.StepFunctions();
  // var transcribeservice = new AWS.TranscribeService();
  // var params = {
  //   stateMachineArn: 'arn:aws:states:us-east-1:741625714969:stateMachine:audio-transcribe-createVocabulary',
  //   input: "{\"list\" : \"" + data['list'] + "\"}",
  //   name: Math.round((new Date()).getTime() / 1000).toString()
  // };
  var tParams = {
    LanguageCode: 'en-US',
    Phrases: data['list'],
    VocabularyName: data['name']
  };
  const dbParams = {
    TableName: 'audio-vocabulary',
    Key: {
        'vocabName': data['name']
    },
    UpdateExpression: "set vocab = :val1",
    ExpressionAttributeValues: {
      ':val1': data['list']
    }
  };
  //dynamodb.update(dbParams, function(err, data) {
  //  if (err) console.log(err, err.stack); // an error occurred
  //  else     console.log(data);           // successful response
  //});
  try {
    var result = await transcribeservice.updateVocabulary(tParams).promise();
    //console.log(result);
    //await dynamoDbLib.call("update", dbParams);
    var dbresult = await dynamodb.update(dbParams).promise();
    console.log('success');
    console.log(result);
    
    return success(result);
  } catch (e) {
    console.log(e)
    return failure({ status: false });
  }
}
