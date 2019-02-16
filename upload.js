import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  console.log(data);
  const params = {
    TableName: process.env.tableName,
    Item: {
      clientId: data.clientId,
      uploadId: uuid.v1(),
      loggedIn: data.user,
      email: data.email,
      filename: data.filename,
      speakers: data.speakers,
      upload: data.upload,
      audioType: data.audio,
      vocabularyName: data.vocabularyName,
      tStatus: 'INITIATING',
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    console.log('success');
    console.log(params.Item);
    return success(params.Item);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
